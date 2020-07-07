const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let categorySchema = new Schema({
    description: { type: String, unique: true, required: [true, 'Description is mandatory'] }
});

module.exports = mongoose.model('Category', categorySchema);