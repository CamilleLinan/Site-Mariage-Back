const Guest = require('../models/Guest.model');

// Créer un invité
exports.createGuest = (req, res) => {
    const guestObject = { ...req.body }
    const guest = new Guest({
        ...guestObject
    })

    guest.save()
        .then((guest) => res.status(201).json({ guest }))
        .catch(error => res.status(400).json({ error }));
}

// Récupérer tous les invités
exports.getAllGuests = (req, res, next) => {
    Guest.find()
        .then(guest => res.status(200).json(guest))
        .catch(error => res.status(404).json({ error }));
};

// Récupérer un invité
exports.getOneGuest = (req, res, next) => {
    Guest.findOne({ _id: req.params.id })
        .then(guest => res.status(200).json(guest))
        .catch(error => res.status(404).json({ error }));
};