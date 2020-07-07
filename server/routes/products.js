const express = require('express');

let app = express();
let Product = require('../models/product');




app.get('/products', (req, res) => {
    Product.find({})
        .exec((err, products) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            res.json({
                ok: true,
                products
            });

        });

});

app.get('/product/test', (req, res) => {
    res.json({
        ok: true,
        productsTEST
    })
});

let productsTEST = [
    { "code": "A1", "description": "Mouse Logitech", "Price": 9.99 },
    { "code": "A2", "description": "Mouse Razer", "Price": 19.99 }
];

module.exports = app;