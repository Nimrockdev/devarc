const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');


let Schema = mongoose.Schema;

let taxSchema = new Schema({
    codeCountry: {
        type: Number,
        index: true,
        required: [true, 'The codeCountry is required']
    },
    code: {
        type: Number,
        index: true,
        required: [true, 'The code is required']
    },
    value: {
        type: Number,
        index: true,
        required: [true, 'The value is required']
    },
    description: {
        type: String,
        required: [true, 'The description is required']
    },
    active: {
        type: Boolean,
        default: true,
        required: [true, 'The active is required']
    }
});


taxSchema.index({ codeCountry: 1, code: 1, value: 1 }, { unique: true });
//taxSchema.plugin(uniqueValidator,);

module.exports = mongoose.model('Tax', taxSchema);