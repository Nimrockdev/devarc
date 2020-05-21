const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let validRole = {
    values: ['ADMIN_ROLE', 'USER_ROLE', 'GUEST'],
    message: '{VALUE} is not a valid role'
}

let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    surnames: {
        type: String,
        required: [true, 'The surname is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'The email is required']
    },
    password: {
        type: String,
        required: [true, 'The password is required']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: validRole
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
    address: {
        street: String,
        city: String,
        state: String,
        zip: Number
    }
});

userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject
}


userSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' })

module.exports = mongoose.model('User', userSchema);