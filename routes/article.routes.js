const express = require('express');
const router = express.Router();

const articleCtrl = require('../controllers/article.controllers');

const auth = require('../middlewares/auth.middleware');
const multer = require('../middlewares/multer-config');

router.post('/', auth, multer, articleCtrl.createArticle);
router.get('/', auth, articleCtrl.getAllArticles);
router.get('/:id', auth, articleCtrl.getOneArticle);

module.exports = router;