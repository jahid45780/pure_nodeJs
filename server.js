const http = require('http')
const path = require('path')
const fs = require('fs')
const filePath = path.join(__dirname, './db/todo.json')

const server = http.createServer((req, res) => {
     // GET todos
     if (req.url === '/todos' && req.method === 'GET') {
          const data = fs.readFileSync(filePath, { encoding: 'utf8' })

          res.writeHead(200, {
               "Content-Type": "application/json",
               "email": "jahid@gmail.com"
          });
          res.end(data)

     // POST todo
     } else if (req.url === '/todos/create-todos' && req.method === 'POST') {
          let data = ''
          req.on('data', (chunk) => {
              data += chunk
          })

          req.on('end', () => {
               const { title, completed } = JSON.parse(data)
               const createdAt = new Date().toLocaleString()

               const allToDos = fs.readFileSync(filePath, { encoding: 'utf8' })
               const parsedToDos = JSON.parse(allToDos)

               parsedToDos.push({ title, completed, createdAt })

               fs.writeFileSync(filePath, JSON.stringify(parsedToDos, null, 2), { encoding: 'utf8' })

               res.writeHead(201, { "Content-Type": "application/json" })
               res.end(JSON.stringify({ title, completed, createdAt }, null, 2))
          })

     } else {
          res.writeHead(404, { "Content-Type": "text/plain" })
          res.end('route not found');
     }
})

server.listen(5000, '127.0.0.1', () => {
     console.log('Server listening on port 5000');
})
