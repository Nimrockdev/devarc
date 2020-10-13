const express = require('express');
const Order = require('../models/order');

const app = express();


app.post('/order',(req, res) =>{


    shoopingCartSchema = {idUser : '5f85b68439ff5a36285471a7', idProduct : '5f7701949449505900f23331'};
    let body = shoopingCartSchema;

    console.log(body);

    let order = new Order({
        idUser : body.idUser,
        orderCost : 99,
        products:{idProduct :shoopingCartSchema.idProduct }
             
    });
   
console.log(order)

});

module.exports = app;