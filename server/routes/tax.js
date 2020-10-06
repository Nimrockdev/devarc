const express = require('express');
const Tax = require('../models/tax');

const app = express();

//Only admin
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

app.post('/tax',(req, res) =>{

    let body = req.body;

    console.log(body)

    let tax = new Tax({
        codeCountry : body.codeCountry,
        code        : body.code,
        value       : body.value,
        description : body.description,
        active      : body.active
    });
   

    tax.save( (err,taxDB) =>{
      
        if (err) {

            return res.status(400).json({
                ok: false,
                err
            });
        }
        
        res.json({
            ok: true,
            tax: taxDB
        });
    });

});


module.exports= app;