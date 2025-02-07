const http = require('http');

const server = http.createServer((req, res) => {
  console.log('Request received:', req.url); 
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to the homepage!');
  } else if (req.url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to the about page!');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page not found!');
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
