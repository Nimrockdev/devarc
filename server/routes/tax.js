const express = require('express');
const Tax = require('../models/tax');

const app = express();


app.get('/tax', (req, res) =>{
    let Taxes;
    Tax.find({})
    .exec((err, taxes) => {
        if (err){
            return res.status(500).json({
                ok:false,
                err
            })
        };
        Taxes = taxes.length;
        res.json({
            Taxes,
            taxes
        })
    })
});




module.exports= app;