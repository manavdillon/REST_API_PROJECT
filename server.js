//Requires and Imports
require('dotenv').config();
const http = require('http');
const app = require('./index');
const fs = require('fs')

//Creating and Running API on port 8080
const server = http.createServer(app);
console.log("Server is connected at port: " + process.env.PORT);
server.listen(process.env.PORT);

//Creating and Hosting Index.html to port 3000
fs.readFile('index.html', function(error, html) {
    if (error) throw error;
    http.createServer(function(request, response) {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
    }).listen(3000)
});