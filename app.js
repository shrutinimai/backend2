const http = require('http');
const fs = require('fs');
const url = require('url');
const server = http.createServer((req, res) => {
const method = req.method;
const parsedUrl = url.parse(req.url, true);

if (method === 'GET' && parsedUrl.pathname === '/') {
res.setHeader('Content-Type', 'text/html');
 res.write(`
      <html>
    <body>
        <form action="/submit" method="POST">
         <label>Name:</label>
         <input type="text" name="username">
        <button type="submit">Submit</button>
         </form>
     </body>
     </html>
    `);
    res.end();
  } else if (method === 'POST' && parsedUrl.pathname === '/submit') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk;
    });
    
    req.on('end', () => {
      const username = new URLSearchParams(body).get('username');
      
      fs.appendFile('users.txt', `Username: ${username}\n`, err => {
        if (err) {
          console.log(err);
          res.statusCode = 500;
          res.end('Error writing to file.');
        } else {
          res.statusCode = 302;
          res.setHeader('Location', '/thank-you');
          res.end();
        }
      });
    });
  } else if (parsedUrl.pathname === '/thank-you') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html><body><h1>Thank you for your submission!</h1></body></html>');
    res.end();
  } else {
    res.statusCode = 404;
    res.end('Page Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
