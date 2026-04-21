#!/usr/bin/env python3
"""
Backend API Testing Script for Contact Form Endpoint
Tests the /api/contact endpoint with various scenarios
"""

import asyncio
import httpx
import json
import os
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorClient

# Get the backend URL from frontend .env
BACKEND_URL = "https://web-replica-129.preview.emergentagent.com"
API_BASE = f"{BACKEND_URL}/api"

# MongoDB connection for verification
MONGO_URL = "mongodb://localhost:27017"
DB_NAME = "test_database"

class ContactEndpointTester:
    def __init__(self):
        self.client = None
        self.db = None
        self.test_results = []
        
    async def setup_db(self):
        """Setup MongoDB connection for verification"""
        try:
            self.client = AsyncIOMotorClient(MONGO_URL)
            self.db = self.client[DB_NAME]
            # Test connection
            await self.client.admin.command('ping')
            print("✅ MongoDB connection established")
            return True
        except Exception as e:
            print(f"❌ MongoDB connection failed: {e}")
            return False
    
    async def cleanup_db(self):
        """Close MongoDB connection"""
        if self.client:
            self.client.close()
    
    async def verify_in_database(self, submission_id):
        """Verify that a submission was persisted in MongoDB"""
        try:
            if self.db is None:
                return False, "No database connection"
            
            doc = await self.db.contact_messages.find_one({"id": submission_id})
            if doc:
                return True, f"Found submission in database: {doc['name']} - {doc['email']}"
            else:
                return False, "Submission not found in database"
        except Exception as e:
            return False, f"Database verification error: {e}"
    
    async def test_contact_endpoint(self, test_name, payload, expected_status=200):
        """Test the contact endpoint with given payload"""
        print(f"\n🧪 Testing: {test_name}")
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    f"{API_BASE}/contact",
                    json=payload,
                    headers={"Content-Type": "application/json"}
                )
                
                print(f"Status Code: {response.status_code}")
                print(f"Response: {response.text}")
                
                result = {
                    "test_name": test_name,
                    "status_code": response.status_code,
                    "expected_status": expected_status,
                    "success": response.status_code == expected_status,
                    "response_data": None,
                    "db_verified": False,
                    "db_message": ""
                }
                
                if response.status_code == 200:
                    try:
                        response_data = response.json()
                        result["response_data"] = response_data
                        
                        # Verify response structure
                        required_fields = ["ok", "id", "forwarded", "note"]
                        missing_fields = [field for field in required_fields if field not in response_data]
                        
                        if missing_fields:
                            result["success"] = False
                            result["error"] = f"Missing required fields: {missing_fields}"
                        else:
                            # Verify in database
                            db_success, db_message = await self.verify_in_database(response_data["id"])
                            result["db_verified"] = db_success
                            result["db_message"] = db_message
                            
                            if not db_success:
                                result["success"] = False
                                
                    except json.JSONDecodeError as e:
                        result["success"] = False
                        result["error"] = f"Invalid JSON response: {e}"
                
                elif response.status_code == 422:
                    try:
                        error_data = response.json()
                        result["error_details"] = error_data
                    except:
                        pass
                
                self.test_results.append(result)
                
                if result["success"]:
                    print("✅ Test PASSED")
                else:
                    print("❌ Test FAILED")
                    if "error" in result:
                        print(f"Error: {result['error']}")
                
                return result
                
        except Exception as e:
            print(f"❌ Test FAILED with exception: {e}")
            result = {
                "test_name": test_name,
                "status_code": None,
                "expected_status": expected_status,
                "success": False,
                "error": str(e)
            }
            self.test_results.append(result)
            return result
    
    async def test_status_endpoint(self):
        """Test the existing /api/status endpoint"""
        print(f"\n🧪 Testing: Status Endpoint (POST)")
        
        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                # Test POST /api/status
                post_payload = {"client_name": "test_client_contact_testing"}
                response = await client.post(
                    f"{API_BASE}/status",
                    json=post_payload,
                    headers={"Content-Type": "application/json"}
                )
                
                print(f"POST Status Code: {response.status_code}")
                print(f"POST Response: {response.text}")
                
                post_success = response.status_code == 200
                
                # Test GET /api/status
                print(f"\n🧪 Testing: Status Endpoint (GET)")
                response = await client.get(f"{API_BASE}/status")
                
                print(f"GET Status Code: {response.status_code}")
                print(f"GET Response: {response.text}")
                
                get_success = response.status_code == 200
                
                return post_success and get_success
                
        except Exception as e:
            print(f"❌ Status endpoint test failed: {e}")
            return False
    
    async def run_all_tests(self):
        """Run all test scenarios"""
        print("🚀 Starting Contact Endpoint Testing")
        print(f"Backend URL: {BACKEND_URL}")
        print(f"API Base: {API_BASE}")
        
        # Setup database connection
        db_connected = await self.setup_db()
        if not db_connected:
            print("⚠️ Continuing without database verification")
        
        # Test 1: Happy path - Valid submission with all fields
        await self.test_contact_endpoint(
            "Happy Path - All Fields",
            {
                "name": "John Doe",
                "email": "john.doe@example.com",
                "subject": "Test Subject",
                "message": "This is a test message for the contact form."
            },
            200
        )
        
        # Test 2: Happy path - Valid submission without optional subject
        await self.test_contact_endpoint(
            "Happy Path - No Subject",
            {
                "name": "Jane Smith",
                "email": "jane.smith@example.com",
                "message": "This is a test message without subject."
            },
            200
        )
        
        # Test 3: Missing required field - no message
        await self.test_contact_endpoint(
            "Missing Required - No Message",
            {
                "name": "Test User",
                "email": "test@example.com",
                "subject": "Test Subject"
            },
            422
        )
        
        # Test 4: Missing required field - empty message
        await self.test_contact_endpoint(
            "Missing Required - Empty Message",
            {
                "name": "Test User",
                "email": "test@example.com",
                "subject": "Test Subject",
                "message": ""
            },
            422
        )
        
        # Test 5: Missing required field - no name
        await self.test_contact_endpoint(
            "Missing Required - No Name",
            {
                "email": "test@example.com",
                "message": "Test message"
            },
            422
        )
        
        # Test 6: Invalid email format
        await self.test_contact_endpoint(
            "Invalid Email Format",
            {
                "name": "Test User",
                "email": "not-an-email",
                "message": "Test message"
            },
            422
        )
        
        # Test 7: Large payload - message with 6000 characters
        large_message = "A" * 6000
        await self.test_contact_endpoint(
            "Large Payload - 6000 chars",
            {
                "name": "Test User",
                "email": "test@example.com",
                "subject": "Large message test",
                "message": large_message
            },
            422
        )
        
        # Test 8: Edge case - message with exactly 5000 characters (should pass)
        max_message = "B" * 5000
        await self.test_contact_endpoint(
            "Edge Case - 5000 chars (max allowed)",
            {
                "name": "Test User",
                "email": "test@example.com",
                "subject": "Max length message test",
                "message": max_message
            },
            200
        )
        
        # Test 9: Test existing status endpoint
        status_success = await self.test_status_endpoint()
        
        # Cleanup
        await self.cleanup_db()
        
        # Print summary
        self.print_summary(status_success)
    
    def print_summary(self, status_endpoint_success):
        """Print test summary"""
        print("\n" + "="*60)
        print("📊 TEST SUMMARY")
        print("="*60)
        
        passed = sum(1 for result in self.test_results if result["success"])
        total = len(self.test_results)
        
        print(f"Contact Endpoint Tests: {passed}/{total} passed")
        print(f"Status Endpoint Test: {'✅ PASSED' if status_endpoint_success else '❌ FAILED'}")
        
        print("\nDetailed Results:")
        for result in self.test_results:
            status = "✅ PASS" if result["success"] else "❌ FAIL"
            print(f"  {status} - {result['test_name']}")
            if not result["success"] and "error" in result:
                print(f"    Error: {result['error']}")
            if result.get("db_verified"):
                print(f"    DB: ✅ {result['db_message']}")
            elif result.get("db_message"):
                print(f"    DB: ❌ {result['db_message']}")
        
        print("\n" + "="*60)
        
        # Overall status
        overall_success = passed == total and status_endpoint_success
        print(f"OVERALL STATUS: {'✅ ALL TESTS PASSED' if overall_success else '❌ SOME TESTS FAILED'}")
        
        return overall_success

async def main():
    """Main test runner"""
    tester = ContactEndpointTester()
    await tester.run_all_tests()

if __name__ == "__main__":
    asyncio.run(main())