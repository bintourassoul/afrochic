const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const port = Number(process.env.PORT || 3000);
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const publicPath = decoded === '/manus-routes.json' || decoded.startsWith('/images/')
    ? path.join(root, 'public', decoded)
    : path.join(root, decoded);
  const candidate = path.normalize(publicPath);
  return candidate.startsWith(root) ? candidate : null;
}

const server = http.createServer((req, res) => {
  const requestPath = req.url || '/';
  let filePath = safePath(requestPath);
  if (!filePath) {
    res.writeHead(400); res.end('Bad request'); return;
  }
  if (requestPath === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end('ok'); return;
  }
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) filePath = path.join(filePath, 'index.html');
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) filePath = path.join(root, 'index.html');
  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream', 'Cache-Control': ext === '.html' || ext === '.json' ? 'no-cache' : 'public, max-age=86400' });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(port, '0.0.0.0', () => console.log(`Afro Chic Studio listening on ${port}`));
