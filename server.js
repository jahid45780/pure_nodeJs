const http = require('http')

const data = [
     {
          id: 1,
          title: "Learn Node.js",
          completed: false
     },
     {
          id: 2,
          title: "Learns Node.js",
          completed: true
     }
]

const server = http.createServer((req, res) => {
     if (req.url === '/todos' && req.method === 'GET') {
          res.writeHead(200, {
               "Content-Type": "application/json",
               "email": "jahid@gmail.com"
          });
          res.end(JSON.stringify(data));
     } else if (req.url === '/todos/create-todos' && req.method === 'POST') {
          res.end('todos create');
     } else {
          res.end('route not found');
     }
})

server.listen(5000, '127.0.0.1', () => {
     console.log('Server listening on port 5000');
});
