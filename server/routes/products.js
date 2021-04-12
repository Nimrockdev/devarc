const express = require('express');

let app = express();
let Product = require('../models/product');


app.get('/products', (req, res) => {
    Product.find({})
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            let numProductos = products.length;
            res.status(200).json({
                ok: true,
                numProductos,
                products
            });

        });

});


app.get('/products/search/:word', (req, res) => {

    let word = req.params.word;
    let negex = new RegExp(word, 'i');

    Product.find({ name: negex })
        .sort('price')
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            let numProductos = products.length;
            res.status(200).json({
                ok: true,
                numProductos,
                products
            });

        });

});

app.get('/products/searchByID/:word', (req, res) => {

    let word = req.params.word;
    //let negex = new RegExp(word, 'i');

    Product.find({ _id: word })
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            let numProductos = products.length;
            res.status(200).json({
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
        category: body.category,
        img: ''
    });

    product.save((err, productDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!productDB) {
            return res.status(201).json({
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

app.get('/products/searchCategoryDesc/:word', (req, res) => {

    let word = req.params.word;

    Product.find({ category: word })
        .populate('category')
        .exec((err, products) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            console.log(products)

            let productoArray = [];

            for (i in products) {

                let producto = new Object();
                producto.name = products[i].name;
                producto.price = products[i].price;

                productoArray.push(producto);

            }

            let numProductos = products.length;
            res.status(200).json({
                ok: true,
                numProductos,
                productoArray
            });

        });

});

module.exports = app;