
✅ Step 1: blogServer.js নামে একটি ফাইল তৈরি করুন
js
Copy
Edit
// blogServer.js
const http = require('http');
const url = require('url');

let posts = [
  { id: 1, title: 'Hello Blog', content: 'This is my first blog post' }
];

function handleRequest(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;
  const pathname = parsedUrl.pathname;

  if (pathname === '/posts' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(posts));

  } else if (pathname === '/posts' && method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const newPost = JSON.parse(body);
        newPost.id = posts.length + 1;
        posts.push(newPost);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Post created', post: newPost }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });

  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
}

const server = http.createServer(handleRequest);

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
✅ চলানোর নিয়ম (Run Command):
bash
Copy
Edit
node blogServer.js
✅ API ব্যবহার (Using the API):
➤ দেখতে চাইলে (GET):
bash
Copy
Edit
GET http://localhost:3000/posts
➤ নতুন পোস্ট পাঠাতে চাইলে (POST):
Body (JSON):

json
Copy
Edit
{
  "title": "New Blog",
  "content": "This is a new blog post"
}
📘 বাংলায় ব্যাখ্যা:
এই কোডটি একটি সাধারণ Node.js HTTP সার্ভার তৈরি করে। এটি /posts রুটে দুটি কাজ করে:

GET /posts ➤ সব পোস্ট দেখায় (একটি JSON লিস্ট)

POST /posts ➤ নতুন পোস্ট যোগ করে (জাভাস্ক্রিপ্ট অবজেক্ট হিসেবে)