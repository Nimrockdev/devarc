const mongoose = require ("moongose");


let Schema = mongoose.Schema;

let orderSchema = new Schema({
     idUser:{ type: Schema.Types.ObjectId, ref: 'User', required: true },
     products:[{
        idProduct:{type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity :{type:numeric, default: 1},
        isgift   :{type :Boolean, default: false }
     }],
     date :{
         type: Date,
         required: [true, 'The date is required']
     },
     orderCost:{
         type: numeric
     }
});


module.exports = mongoose.model('Order', orderSchema);