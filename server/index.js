const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

app.use(express.static('public'));
app.use(bodyParser.json());




module.exports = app;