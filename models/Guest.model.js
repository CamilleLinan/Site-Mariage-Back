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
        possibleValues: ['Oui', 'Non', 'Ne sais pas encore']
    } 
})

module.exports = mongoose.model('Guest', guestSchema);