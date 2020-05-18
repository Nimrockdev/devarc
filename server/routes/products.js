const express = require('express');

let app = express();

app.get('/product/test', (req, res) => {
    res.json({
        ok: true,
        products
    })
});

let products = [
    { "code": "A1", "description": "Mouse Logitech", "Price": 9.99 },
    { "code": "A2", "description": "Mouse Razer", "Price": 19.99 }
];


module.exports = app;