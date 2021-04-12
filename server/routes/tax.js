const express = require('express');
const Tax = require('../models/tax');

const app = express();

//Only admin
app.get('/tax', (req, res) =>{
    let Taxes;
    Tax.find({})
    .exec((err, taxes) => {
        if (err){
            return res.status(400).json({
                ok:false,
                err
            })
        };
        Taxes = taxes.length;
        res.status(200).json({
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
        
        res.status(201).json({
            ok: true,
            tax: taxDB
        });
    });

});


app.get('/tax/search/:word', (req, res) =>{
    let word = req.params.word;
    //let negex = new RegExp(word,'i');

    console.log(word);
    // console.log(object)
    Tax.find({codeCountry: word})
        .sort('value')
        .exec((err, taxes) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            let numTaxes = taxes.length;
            res.status(200).json({
                ok: true,
                numTaxes,
                taxes
            });

        });
})

module.exports= app;