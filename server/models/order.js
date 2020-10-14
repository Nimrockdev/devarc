const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let orderSchema = new Schema({
     idUser : { type: Schema.Types.ObjectId, ref: 'User', required: true },
     date : {  type: Date, default: Date.now() },
     orderPrice : { type: Number },
     paidOut : { type: Boolean, default: false},
     products:[{
        idProduct : {type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity  : {type: Number, default: 1},
        isgift    : {type :Boolean, default: false },
        price     : {type: Number, required: [true, 'It is necessary to indicate the price'] },
        priceCost : {type: Number, required: [true, 'It is necessary to indicate the price cost'] },
     }]
});


module.exports = mongoose.model('Order', orderSchema);