const express = require('express');

let app = express();

app.use((req, res, next)=>{
    app.locals.counter = (++app.locals.counter || 1);
    //console.log(`Visitor counter ${app.locals.counter}`);
    next();
});

module.exports = app;