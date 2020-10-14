const express = require('express');
const shoppingCart = require('../models/shoppingCart');

const app = express();

app.post('/shoppingCart',(req, res) =>{


    // shoopingCartSchema = {  idUser : '5f85b68439ff5a36285471a7', 
    //                         products:[{ idProduct: '5f7701949449505900f23331',
    //                                     quantity : '1',
    //                                     isgift   : false,
    //                                     price    : 10.25,
    //                                     priceCost: 9.50
    //                                   },
    //                                   { idProduct: '5f7701c99449505900f23333',
    //                                     quantity : '1',
    //                                     isgift   : false,
    //                                     price    : 10.10,
    //                                     priceCost: 9                                           
    //                                   }]
    //                         };
    
    let body = req.body;
    let productsJSON = JSON.parse(req.body.products);
  
    let orderPrice = 0;

    productsJSON.forEach( product => {
        orderPrice = orderPrice + product.price; 
    });

 
    let shoopingCart = new shoppingCart({
        idUser : body.idUser,
        orderPrice :orderPrice,
        products : productsJSON
    });
    console.log(shoopingCart)

   

    shoopingCart.save((err, shoopingCartDB)=> {

        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if(!shoopingCartDB){
            return res.statys(400).json({
                ok:false,
                err
            });
        }

        res.json({
            ok:true,
            shoopingCartDB
        })

    });
  

});

module.exports = app;
