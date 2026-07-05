const http = require('http');
const fs = require('fs');
const path = require('path');

const serveDir = path.resolve(__dirname);
const mime = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/api/')) {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: req.url,
      method: req.method,
      headers: req.headers
    };
    const proxy = http.request(options, (proxyRes) => {
      let body = [];
      proxyRes.on('data', chunk => body.push(chunk));
      proxyRes.on('end', () => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        res.end(Buffer.concat(body));
      });
    });
    if (req.method === 'POST' || req.method === 'PUT') {
      let body = [];
      req.on('data', chunk => body.push(chunk));
      req.on('end', () => proxy.end(Buffer.concat(body)));
    } else {
      proxy.end();
    }
    return;
  }
  let filePath = path.join(serveDir, req.url === '/' ? 'index.html' : req.url);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end('Not found');
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': mime[ext] || 'text/html' });
    res.end(data);
  });
});

server.listen(3000, () => {
  console.log('Frontend server running on port 3000');
});
