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
            let numProductos = products.length;
            res.json({
                ok: true,
                numProductos,
                products
            });

        });

});


app.get('/products/search/:word', (req, res) => {

let word = req.params.word;
let negex = new RegExp(word,'i');

    Product.find({name: negex})
        .sort('price')
        .exec((err, products) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            let numProductos = products.length;
            res.json({
                ok: true,
                numProductos,
                products
            });

        });

});


app.post('/products', (req, res) => {

    let body = req.body;

    let product = new Product({
        name: body.name,
        price: body.price,
        priceCost: body.priceCost,
        description: body.description,
        category: body.category
    });

    product.save((err, productDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            productDB
        })
    })
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