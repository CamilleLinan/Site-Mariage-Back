const mongoose = require('mongoose');

const guestSchema = mongoose.Schema ({
    lastname: { 
        type: String, 
        required: true, 
        trim: true },
    firstname: { 
        type: String, 
        required: true, 
        trim: true },
    willBePresent: {
        type: String,
        required: true,
        possibleValues: ['Confirmée', 'En attente', 'Annulée'],
        default: 'En attente'
    } 
})

module.exports = mongoose.model('Guest', guestSchema);