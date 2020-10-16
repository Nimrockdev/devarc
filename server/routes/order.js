const express = require('express');
const Order = require('../models/order');

const app = express();


app.post('/order',(req, res) =>{

    let orderPrice = 0;
    
    shoopingCartSchema = {  idUser : '5f85b68439ff5a36285471a7', 
                            products:[{ idProduct: '5f7701949449505900f23331',
                                        quantity : '1',
                                        isgift   : false,
                                        price    : 10.25,
                                        priceCost: 9.50
                                      },
                                      { idProduct: '5f7701c99449505900f23333',
                                        quantity : '2',
                                        isgift   : false,
                                        price    : 10.10,
                                        priceCost: 9                                           
                                      }]
                            };

    let body = shoopingCartSchema;
    
    body.products.forEach(product => {

        orderPrice = orderPrice + (product.price * product.quantity );
        
    });

    let order = new Order({
        idUser : body.idUser,
        orderPrice : orderPrice,
        products: body.products   
    });
   

    order.save((err, orderDB)=> {

        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if(!orderDB){
            return res.statys(400).json({
                ok:false,
                err
            });
        }

        res.json({
            ok:true,
            orderDB
        })

    });
  

});

module.exports = app;