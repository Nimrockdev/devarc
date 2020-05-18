const express = require('express');

let app = express();

app.get('/dev', (req, res) => {
    let d = new Date();

    res.json({
        ok: true,
        message: `Hello dev! ${d.toTimeString()}`
    });

});

module.exports = app;