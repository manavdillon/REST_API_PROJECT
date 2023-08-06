//Importing Express and Cors
const express = require('express');
const cors = require('cors');

//Custom backend APIs
const APIRoute = require('./routes/API');

//Creating APP to export
const app = express();
app.use(cors());

//Running API.js
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/API', APIRoute);

//Importing Data JSON FIle
const json_file = './data/data.json';
app.get('/archive', (req, res) => {
    res.json(require(json_file));
});

//Exporting to Server
module.exports = app;