const Message = require("../models/Message.model");

// Créer un message
exports.createMessage = (req, res) => {
    const messageObject = { ...req.body };

    const message = new Message ({
        ...messageObject
    })

    message.save()
        .then((message) => res.status(201).json({ message }))
        .catch(error => res.status(400).json({ error }));
};

// Récupérer les messages
exports.getAllMessages = (req, res) => {
    Message.find()
        .then(message => res.status(200).json(message))
        .catch(error => res.status(404).json({ error }));
    
};

exports.findOwnMessages = (req, res) => {
    // Récupérer le(s) message(s) de l'utilisateur dans la bdd en utilisant 
    // les paramètres de requête lastname et firstname
    const lastname = req.params.lastname;
    const firstname = req.params.firstname;
    Message.find({ lastname: lastname, firstname: firstname }, function(err, message) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(message);
      }
    });
}