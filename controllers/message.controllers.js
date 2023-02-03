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
    Message.aggregate([
        {"$lookup": {
            "from": "users",
            "localField": "posterId",
            "foreignField": "_id",
            "as": "User"
        }},
    ]).sort({messageNumber:-1})
        .then(messages => res.status(200).json(messages))
        .catch(error => res.status(404).json({ error }));
};

// Retrouver ses propres messages
exports.findOwnMessages = (req, res) => {
    const userId = req.params.userId;

    Message.find({ posterId: userId })
        .then(messages => {
            res.status(200).json({ messages });
        })
        .catch(error => {
            res.status(400).json({ error });
        });
};

// Répondre à un message
exports.replyMessage = (req, res) => {
    Message.findByIdAndUpdate(
        req.params.id,
        { $set: { 
            "response.text": req.body.response.text, 
            "response.isRead": req.body.response.isRead,
            isRead: true } },
        { returnOriginal: false }
      )
        .then(message => res.status(200).json(message))
        .catch(error => res.status(400).json(error));
}

// Indiquer que le message est lu
exports.readMessage = (req, res) => {
    Message.findByIdAndUpdate(
        req.params.id,
        { $set: { isRead: req.body.isRead } },
        { returnOriginal: false }
      )
        .then(message => res.status(200).json(message))
        .catch(error => res.status(400).json(error));
}

// Indiquer que la réponse est lue
exports.readResponse = (req, res) => {
    Message.findByIdAndUpdate(
        req.params.id,
        { $set: { "response.isRead": req.body.response.isRead } },
        { returnOriginal: false }
      )
        .then(message => res.status(200).json(message))
        .catch(error => res.status(400).json(error));
}