========================================================
  Automatic Solutions Iberia - Archivos web para FTP
========================================================

Estos son los archivos ESTATICOS listos para subir a tu
hosting mediante FileZilla (FTP/SFTP).

-------- COMO SUBIR CON FILEZILLA --------

1. Abre FileZilla y conectate a tu servidor FTP.
2. En el panel REMOTO, navega al directorio raiz de tu
   web (normalmente: public_html/, htdocs/, www/ o /).
3. En el panel LOCAL, abre esta carpeta (.www).
4. Selecciona TODOS los archivos y carpetas (incluido
   el archivo oculto .htaccess) y arrastralos al panel
   remoto.

   IMPORTANTE: asegurate de que FileZilla muestra archivos
   ocultos (Servidor -> Forzar mostrar archivos ocultos)
   para que se suba tambien el .htaccess.

-------- ESTRUCTURA --------

  index.html                  Pagina principal (INICIO)
  productos.html              Pagina PRODUCTOS
  proyectos.html              Pagina PROYECTOS
  noticias.html               Pagina NOTICIAS
  contacto.html               Pagina CONTACTO
  productos/index.html        (misma pagina, URL limpia)
  proyectos/index.html
  noticias/index.html
  contacto/index.html
  .htaccess                   Reglas de reescritura (Apache)
  robots.txt                  Para buscadores
  sitemap.xml                 Mapa del sitio
  favicon.ico / .png          Iconos
  logo/asi-logo.png           Logo ASI
  news/*.jpg                  Fotos de noticias
  static/                     JS y CSS compilados

-------- REQUISITOS DEL SERVIDOR --------

- Apache con mod_rewrite activo (para URLs limpias /productos)
  Si tu hosting usa Nginx, pide al proveedor que configure
  el fallback a index.html.
- PHP no es necesario.

-------- FORMULARIO DE CONTACTO --------

El formulario de contacto envia los mensajes al backend
Emergent (que los reenvia al email jofre.ayala@automaticsolutionsiberia.com
via FormSubmit).

Si en el futuro necesitas cambiar el backend, habra que
reconstruir la app (yarn build) con el nuevo REACT_APP_BACKEND_URL.

