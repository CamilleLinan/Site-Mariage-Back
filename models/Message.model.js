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
    response: {
        type: String, 
        required: false },
    isRead: {
        type: Boolean,
        default: false,
        required: false }
}, {timestamps: true})

module.exports = mongoose.model('Message', messageSchema);