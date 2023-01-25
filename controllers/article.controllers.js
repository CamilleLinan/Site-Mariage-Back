const Article = require('../models/Article.model');

// Créer un article
exports.createArticle = (req, res) => {
    const articleObject = req.file ? {
        articlePicture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    const userId = req.body.userId
    const description = req.body.description;

    const article = new Article({
        ...articleObject,
        userId,
        description
    });

    article.save()
        .then((article) => res.status(201).json({ article, message: "Article créé avec succès !" }))
        .catch(error => res.status(400).json({ error }));
};

// Récupérer un article
exports.getOneArticle = (req, res, next) => {
    Article.findOne({ _id: req.params.id })
        .then(article => res.status(200).json(article))
        .catch(error => res.status(404).json({ error }));
};

// Récupérer tous les articles
exports.getAllArticle = (req, res, next) => {
    Article.find()
        .then(articles => res.status(200).json(articles))
        .catch(error => res.status(404).json({ error }));
};