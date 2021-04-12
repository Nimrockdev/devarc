const express = require('express');

let app = express();

app.get('/', (req, res) =>{
    res.status(200).send(`Devarc is online`);
});


app.get('*', (req,res)=>{
    console.log(`Request "${req.path}" not supported`);
    res.status(404).send(`Request "${req.path}" not supported, HTTP Status Code 404 - Not Found`);
})

module.exports = app;