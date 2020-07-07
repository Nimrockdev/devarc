const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let Schema = mongoose.Schema;

let productSchema = new Schema({
    name: { type: String, required: [true, 'It is necessary to indicate the name'] },
    price: { type: Number, required: [true, 'It is necessary to indicate the price'] },
    priceCost: { type: Number, required: [true, 'It is necessary to indicate the price cost'] },
    description: { type: String, required: false },
    img: { type: String, required: false },
    avaiable: { type: Boolean, required: true, default: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
});


module.exports = mongoose.model('Product', productSchema);