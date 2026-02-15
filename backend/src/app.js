// Server entry point (http.createServer)
const http = require('http');
const dotenv = require('dotenv');
const routes = require('./routes');
const db = require('./config/db');

// Load environment variables
dotenv.config({ path: '../.env' });

const hostname = process.env.HOST || 'localhost';
const port = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  routes(req, res, db);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
