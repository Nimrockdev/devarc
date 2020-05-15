/*Routes configuration*/
const express = require('express');
const app = express();

app.use(require('./dev'));

module.exports = app;