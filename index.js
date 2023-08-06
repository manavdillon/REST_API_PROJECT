const express = require('express');
const cors = require('cors');

//Custome backend APIs
const projRoute = require('./routes/proj');

const app = express();
app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/proj', projRoute);

const json_file = './data/data.json';
app.get('/archive', (req, res) => {
    res.json(require(json_file));
});

module.exports = app;