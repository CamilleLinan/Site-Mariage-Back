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
        possibleValues: ['Oui', 'Non', 'Ne sait pas encore'],
        default: 'Ne sait pas encore'
    } 
})

module.exports = mongoose.model('Guest', guestSchema);