/*Routes configuration*/
const express = require('express');
const app = express();

app.use(require('./dev'));
app.use(require('./user'));
app.use(require('./products'));
app.use(require('./login'));

app.use(require('./category'));
app.use(require('./tax'));


app.use(require('./order'));
app.use(require('./shoppingCart'));
app.use(require('./upload'));

app.use(require('./others'));

module.exports = app;