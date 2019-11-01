const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api/authentication', require('./routes/api/authentication'));

module.exports = app;