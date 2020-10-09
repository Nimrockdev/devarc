const mongoose = require ("moongose");


let Schema = mongoose.Schema;

let shoopingCartSchema = new Schema({
     idUser:{ type: Schema.Types.ObjectId, ref: 'User', required: true },
     idProduct:{ type: Schema.Types.ObjectId, ref: 'Product', required: true }
});


module.exports = mongoose.model('ShoopingCart', shoopingCartSchema);