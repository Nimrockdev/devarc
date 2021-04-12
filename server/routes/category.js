const express = require('express');
const Category = require('../models/category');
const { checkToken, isAdmin } = require('../middlewares/authentication');


let app = express();

app.get('/category', (req, res) => {
    Category.find({})
        .sort('description')
        .exec((err, categories) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            };
            res.status(200).json({
                ok: true,
                categories
            });
        })
});


app.post('/category', (req, res) => {
    let body = req.body;

    let category = new Category({
        description: body.description
    });

    category.save((err, categoryDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        };

        if (!categoryDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        };

        res.status(201).json({
            ok: true,
            category: categoryDB
        });

    });
});


module.exports = app;