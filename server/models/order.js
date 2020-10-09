const mongoose = require ("moongose");


let Schema = mongoose.Schema;

let orderSchema = new Schema({
     idUser:{ type: Schema.Types.ObjectId, ref: 'User', required: true },
     products:[{
        idProduct:{type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity :{type:numeric, default: 1}
     }],
     date :{
         type: date,
         required: [true, 'The date is required']
     },
     orderCost:{
         type: numeric
     },
     gift :{
         type :Boolean,
         default: false
     }
});


module.exports = mongoose.model('Order', orderSchema);