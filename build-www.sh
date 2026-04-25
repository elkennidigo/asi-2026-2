#!/bin/bash
# Build script: regenerates /app/.www with clean HTML files (no Emergent badge / tracking)
set -e

cd /app/frontend
echo "▶ Running yarn build..."
yarn build 2>&1 | tail -3

echo "▶ Copying to /app/.www..."
rm -rf /app/.www
mkdir -p /app/.www
cp -r /app/frontend/build/. /app/.www/

# Per-route copies (clean URLs + .html fallback)
for route in productos proyectos noticias contacto; do
  mkdir -p "/app/.www/$route"
  cp /app/.www/index.html "/app/.www/$route/index.html"
  cp /app/.www/index.html "/app/.www/$route.html"
done

echo "▶ Stripping Emergent badge / tracking from HTML..."
python3 - <<'PY'
import os, re, glob
files = glob.glob('/app/.www/**/*.html', recursive=True)
for path in files:
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()
    html = re.sub(r'<a id="emergent-badge"[^>]*>.*?</a>', '', html, flags=re.DOTALL)
    html = re.sub(r'<script[^>]*src="https://assets\.emergent\.sh[^"]*"[^>]*></script>', '', html)
    html = re.sub(r'<script>!function\(e,t\)\{var r,s,o,i;t\.__SV.*?</script>', '', html, flags=re.DOTALL)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(html)
print(f"  Cleaned {len(files)} HTML files")
PY

echo "▶ Writing .htaccess (con HTTPS forzado + cabeceras de seguridad)..."
cat > /app/.www/.htaccess <<'HT'
# =====================================================
#  Automatic Solutions Iberia - Apache config
#  HTTPS forzado + Cabeceras de seguridad + SPA routing
# =====================================================

Options -MultiViews
RewriteEngine On

# ---------- 1) FORZAR HTTPS ----------
# Redirige cualquier petición HTTP a HTTPS automaticamente.
# Solo tendrá efecto cuando el certificado SSL esté instalado en el hosting.
RewriteCond %{HTTPS} !=on
RewriteCond %{HTTP:X-Forwarded-Proto} !https
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# ---------- 2) Redirigir www -> sin www (opcional) ----------
# Descomenta estas dos lineas si quieres que automaticsolutionsiberia.com sea la canonica
# RewriteCond %{HTTP_HOST} ^www\.(.+)$ [NC]
# RewriteRule ^(.*)$ https://%1/$1 [L,R=301]

# ---------- 3) SPA / React Router fallback ----------
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]

# ---------- 4) MIME ----------
AddType image/x-icon .ico
AddType application/manifest+json .webmanifest

# ---------- 5) CABECERAS DE SEGURIDAD ----------
<IfModule mod_headers.c>
  # HSTS: obliga a navegadores a usar siempre HTTPS durante 1 año (incluye subdominios)
  # IMPORTANTE: solo activar despues de tener SSL funcionando bien
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"

  # Evita clickjacking (que tu web sea cargada en un iframe en otra pagina)
  Header always set X-Frame-Options "SAMEORIGIN"

  # Evita MIME sniffing
  Header always set X-Content-Type-Options "nosniff"

  # Politica de referrer (envia menos info al navegar a otros sitios)
  Header always set Referrer-Policy "strict-origin-when-cross-origin"

  # Permissions-Policy (limita APIs sensibles)
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"

  # Cross-Origin-Opener-Policy
  Header always set Cross-Origin-Opener-Policy "same-origin"
</IfModule>

# ---------- 6) Cache aggressive para assets / nunca para HTML ----------
<IfModule mod_headers.c>
  <FilesMatch "\.(js|css|woff2?|ttf|eot|svg|jpg|jpeg|png|gif|webp|ico)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\.html$">
    Header set Cache-Control "no-cache, must-revalidate"
  </FilesMatch>
</IfModule>

# ---------- 7) Compresion gzip ----------
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/plain text/xml text/javascript
  AddOutputFilterByType DEFLATE application/javascript application/json application/xml
  AddOutputFilterByType DEFLATE image/svg+xml
</IfModule>

# ---------- 8) Bloquear acceso a archivos sensibles ----------
<FilesMatch "(^\.|\.htaccess|\.git|\.env|README\.txt)$">
  Require all denied
</FilesMatch>
HT

cat > /app/.www/robots.txt <<'EOF'
User-agent: *
Allow: /
Sitemap: /sitemap.xml
EOF

cat > /app/.www/sitemap.xml <<'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>/</loc><priority>1.0</priority></url>
  <url><loc>/productos</loc><priority>0.8</priority></url>
  <url><loc>/proyectos</loc><priority>0.8</priority></url>
  <url><loc>/noticias</loc><priority>0.7</priority></url>
  <url><loc>/contacto</loc><priority>0.6</priority></url>
</urlset>
EOF

cat > /app/.www/SSL-INSTRUCCIONES.txt <<'EOF'
========================================================
  COMO ACTIVAR EL CERTIFICADO SSL (HTTPS) - GRATIS
========================================================

El SSL NO se sube como archivo por FTP. Se activa en el panel
de tu hosting (1 click en la mayoria de proveedores).

-------- OPCION 1: PANEL DE HOSTING (cPanel/Plesk) --------

1. Entra al panel de control de tu hosting (cPanel, Plesk, etc).
2. Busca la seccion "SSL/TLS" o "Let's Encrypt".
3. Selecciona tu dominio y pulsa "Emitir / Instalar".
4. El certificado se generara automaticamente y sera GRATIS
   (renovacion automatica cada 90 dias).
5. Comprueba que tu web carga en https://tudominio.com

   La mayoria de proveedores tienen esta opcion:
   - HOSTINGER: Hosting -> SSL -> Configurar SSL (gratis)
   - SITEGROUND: Sites -> Security -> SSL Manager
   - IONOS: Hosting -> SSL/TLS -> Activar
   - GODADDY: Mis Productos -> SSL -> Configurar
   - Banahosting / Webempresa / Raiola: Pestaña SSL -> Let's Encrypt

-------- OPCION 2: PEDIR AL SOPORTE --------

Si no encuentras la opcion, contacta al soporte de tu hosting
y diles literalmente:

   "Hola, quiero activar el certificado SSL gratuito de
    Let's Encrypt para mi dominio [tudominio.com]. ¿Lo
    podeis activar por mi?"

Es un tramite estandar y suelen activarlo en minutos.

-------- OPCION 3: CLOUDFLARE (gratis y global) --------

Si tu hosting no ofrece SSL gratis, puedes usar Cloudflare:

1. Crea cuenta en https://www.cloudflare.com (gratis)
2. Añade tu dominio
3. Cambia los DNS de tu dominio por los que te indica Cloudflare
4. En SSL/TLS -> selecciona modo "Full" o "Flexible"
5. Listo, tu web ya tiene HTTPS

-------- DESPUES DE ACTIVAR EL SSL --------

El archivo .htaccess que se sube YA esta configurado para:

  ✓ Redirigir HTTP -> HTTPS automaticamente (forzar SSL)
  ✓ Activar HSTS (un año) para maxima seguridad
  ✓ Bloquear clickjacking (X-Frame-Options)
  ✓ Bloquear MIME sniffing (X-Content-Type-Options)
  ✓ Politica de referrer estricta
  ✓ Permissions-Policy (camara, microfono, geolocalizacion bloqueados)

Una vez activado el SSL en el hosting, todo lo demas se aplica
automaticamente sin que tengas que tocar nada.

-------- COMPROBAR LA SEGURIDAD --------

Despues del despliegue, comprueba la calidad del SSL en:

  https://www.ssllabs.com/ssltest/analyze.html?d=tudominio.com

Deberias obtener calificacion A o A+.

========================================================
EOF

echo ""
echo "✓ Done. Total: $(du -sh /app/.www | cut -f1)"
echo "  HTML files: $(find /app/.www -name '*.html' | wc -l)"
echo "  Verifying clean: $(grep -l "Made with Emergent" /app/.www/*.html 2>/dev/null | wc -l) files contain badge text"
