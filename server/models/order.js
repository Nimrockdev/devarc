const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let orderSchema = new Schema({
     idUser : { type: Schema.Types.ObjectId, ref: 'User', required: true },
     date : {  type: Date, default: Date.now() },
     orderCost : { type: Number },
     paidOut : { type: Boolean, default: false},
     products:[{
        idProduct:{type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity :{type: Number, default: 1},
        isgift   :{type :Boolean, default: false }
     }]
});


module.exports = mongoose.model('Order', orderSchema);