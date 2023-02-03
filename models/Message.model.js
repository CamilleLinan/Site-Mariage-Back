const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = Schema({
    posterId: {
        type: Schema.Types.ObjectId,
        ref: 'users', 
        required: true
    },
    object: {
        type: String, 
        required: true, 
        trim: true 
    },
    message: {
        type: String, 
        required: true, 
        trim: true 
    },
    response: {
        type: Schema.Types.Mixed,
        default: {
            text: '',
            isRead: true 
        },  
        required: false 
    },
    isRead: {
        type: Boolean,
        default: false,
        required: false 
    }
}, {timestamps: true})

module.exports = mongoose.model('Message', messageSchema);