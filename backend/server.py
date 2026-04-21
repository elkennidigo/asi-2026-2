from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import httpx


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# ---------------- Contact Form ----------------

RECIPIENT_EMAIL = os.environ.get('CONTACT_RECIPIENT_EMAIL', 'jofre.ayala@automaticsolutionsiberia.com')


class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    subject: Optional[str] = Field(default='', max_length=200)
    message: str = Field(..., min_length=1, max_length=5000)


class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str = ''
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    email_forwarded: bool = False
    forward_status: Optional[str] = None


@api_router.post("/contact")
async def submit_contact(payload: ContactMessageCreate):
    """Receive a contact message, store in MongoDB, forward to recipient via FormSubmit."""
    record = ContactMessage(
        name=payload.name.strip(),
        email=str(payload.email).strip(),
        subject=(payload.subject or '').strip(),
        message=payload.message.strip(),
    )

    # Try to forward the email via FormSubmit (no API key required).
    try:
        async with httpx.AsyncClient(timeout=15.0) as http:
            resp = await http.post(
                f"https://formsubmit.co/ajax/{RECIPIENT_EMAIL}",
                json={
                    "name": record.name,
                    "email": record.email,
                    "_subject": f"[ASI Web] {record.subject or 'Nuevo mensaje del formulario de contacto'}",
                    "asunto": record.subject or '-',
                    "mensaje": record.message,
                    "_template": "table",
                    "_captcha": "false",
                },
                headers={"Accept": "application/json"},
            )
            data = resp.json() if resp.headers.get("content-type", "").startswith("application/json") else {}
            if resp.status_code == 200 and str(data.get("success", "")).lower() == "true":
                record.email_forwarded = True
                record.forward_status = "sent"
            else:
                record.forward_status = data.get("message") or f"http_{resp.status_code}"
    except Exception as ex:
        record.forward_status = f"error:{ex.__class__.__name__}"
        logger.exception("FormSubmit forwarding failed")

    # Persist in MongoDB (always, so we never lose a submission).
    doc = record.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    try:
        await db.contact_messages.insert_one(doc)
    except Exception:
        logger.exception("Failed to persist contact message")

    return {
        "ok": True,
        "id": record.id,
        "forwarded": record.email_forwarded,
        "note": record.forward_status,
    }

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()