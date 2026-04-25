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

echo "▶ Writing .htaccess..."
cat > /app/.www/.htaccess <<'HT'
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]
AddType image/x-icon .ico
<FilesMatch "\.(js|css|woff2?|jpg|jpeg|png|gif|webp|ico|svg)$">
  Header set Cache-Control "public, max-age=31536000, immutable"
</FilesMatch>
<FilesMatch "\.html$">
  Header set Cache-Control "no-cache, must-revalidate"
</FilesMatch>
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json image/svg+xml
</IfModule>
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

echo ""
echo "✓ Done. Total: $(du -sh /app/.www | cut -f1)"
echo "  HTML files: $(find /app/.www -name '*.html' | wc -l)"
echo "  Verifying clean: $(grep -lc "Made with Emergent" /app/.www/*.html 2>/dev/null | wc -l) files contain badge text"
