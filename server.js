require('dotenv').config();
const http = require('http');
const app = require('./index');

const server = http.createServer(app);
console.log("Server is connected at port: " + process.env.PORT);
server.listen(process.env.PORT);