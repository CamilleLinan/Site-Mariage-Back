const Guest = require('../models/Guest.model');

// Créer un invité
exports.createGuest = (req, res) => {
    const guestObject = { ...req.body };

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

// Éditer un invité
exports.updateGuest = (req, res) => {
    const guestObject = { ...req.body }

    Guest.findOneAndUpdate({ _id: req.params.id }, { ...guestObject, ...req.body, _id: req.params.id }, { returnOriginal: false })
        .then((guest) => res.status(200).json(guest))
        .catch((error) => res.status(400).json(error));
}

// Supprimer un invité
exports.deleteGuest = (req, res) => {
    Guest.findOne({ _id: req.params.id })
        .then(guest => {
            if (guest.userId !== req.auth.userId && req.body.isAdmin === false) {
                res.status(401).json({ message: 'Non autorisé⸱e' });
            } else {
                Guest.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Invité⸱e supprimé⸱e !' }))
                    .catch(error => res.status(400).json({ error }));
            }
        })
        .catch(error => res.status(404).json({ error }))
};

exports.findSelf = (req, res) => {
    // Recherchez le Guest dans la base de données en utilisant les paramètres de requête lastname et firstname
    const lastname = req.params.lastname;
    const firstname = req.params.firstname;
    Guest.findOne({ lastname: lastname, firstname: firstname }, function(err, guest) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(guest);
      }
    });
}

exports.updateSelf = async (req, res) => {
    const { lastname, firstname } = req.params;
    const update = req.body;
    try {
      const guest = await Guest.findOneAndUpdate({ lastname, firstname }, update, { new: true });
      res.json(guest);
    } catch (err) {
      res.json({ message: err });
    }
  };