const mongoose = require('mongoose');

const articleSchema = mongoose.Schema ({
    userId: { 
        type: String, 
        required: true },
    title: { 
        type: String, 
        required: true },
    description: { 
        type: String, 
        required: true },
    picture: { 
        type: String, 
        required: false },
    likes: { 
        type: Number, 
        required: false, 
        default: 0 },
    usersLiked: { 
        type: [String], 
        required: false },
}, {timestamps: true});

module.exports = mongoose.model('Article', articleSchema);