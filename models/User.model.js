const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { isEmail } = require('validator');

const userSchema = mongoose.Schema({
    lastname: { 
        type: String, 
        required: true, 
        trim: true },
    firstname: { 
        type: String, 
        required: true, 
        trim: true },
    email: { 
        type: String, 
        required: true, 
        validate: [isEmail], 
        unique: true, 
        trim: true },
    password: { 
        type: String, 
        required: true, 
        trim: true },
    isAdmin: {
        type: Boolean,
        default: false
    },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);