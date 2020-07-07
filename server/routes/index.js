/*Routes configuration*/
const express = require('express');
const app = express();

app.use(require('./dev'));
app.use(require('./user'));
app.use(require('./products'));
app.use(require('./login'));

app.use(require('./category'));



module.exports = app;