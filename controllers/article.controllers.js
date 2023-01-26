const Article = require('../models/Article.model');
const fs = require('fs');

// Créer un article
exports.createArticle = (req, res) => {
    const articleObject = req.file ? {
        picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    delete articleObject.userId;
    const title = req.body.title
    const description = req.body.description;

    const article = new Article({
        ...articleObject,
        userId: req.auth.userId,
        title,
        description
    });

    article.save()
        .then((article) => res.status(201).json({ article }))
        .catch(error => res.status(400).json({ error }));
};

// Récupérer tous les articles
exports.getAllArticles = (req, res, next) => {
    Article.find()
        .then(articles => res.status(200).json(articles))
        .catch(error => res.status(404).json({ error }));
};

// Récupérer un article
exports.getOneArticle = (req, res, next) => {
    Article.findOne({ _id: req.params.id })
        .then(article => res.status(200).json(article))
        .catch(error => res.status(404).json({ error }));
};

// Éditer un article
exports.updateArticle = (req, res) => {
    const articleObject = req.file ? {
        picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete articleObject.userId;
    Article.findOne({ _id: req.params.id })
        .then(article => {
            if (article.userId !== req.auth.userId) {
                res.status(401).json({ message: 'Non autorisé' });
            } else {
                if (article.picture && req.file) {
                    const filename = article.picture.split('/images')[1];
                    fs.unlink(`images/${filename}`, () => {
                        Article.findOneAndUpdate({ _id: req.params.id }, { ...articleObject, ...req.body, _id: req.params.id }, { returnOriginal: false })
                        .then((article) => res.status(200).json(article))
                        .catch((error) => res.status(400).json(error));
                    })
                } else {
                    Article.findOneAndUpdate({ _id: req.params.id }, { ...articleObject, ...req.body, _id: req.params.id }, { returnOriginal: false })
                        .then((article) => res.status(200).json(article))
                        .catch((error) => res.status(400).json(error));
                }
            }
        })
        .catch(error => res.status(404).json({ error }));
};

// Supprimer un article
exports.deleteArticle = (req, res, next) => {
    Article.findOne({ _id: req.params.id })
        .then(article => {
            if (article.userId !== req.auth.userId) {
                res.status(401).json({ message: 'Non autorisé' });
            } else {
                const filename = article.picture.split('/images')[1];
                fs.unlink(`images/${filename}`, () => {
                    Article.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Article supprimé !' }))
                        .catch(error => res.status(400).json({ error }));
                });
            }
        })
        .catch(error => res.status(404).json({ error }))
};