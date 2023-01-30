const mongoose = require('mongoose');

const messageSchema = mongoose.Schema ({
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
        trim: true },
    object: {
        type: String, 
        required: true, 
        trim: true },
    message: {
        type: String, 
        required: true, 
        trim: true },
})

module.exports = mongoose.model('Message', messageSchema);