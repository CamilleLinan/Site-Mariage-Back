const express = require('express');
const router = express.Router();

const articleCtrl = require('../controllers/article.controllers');

const auth = require('../middlewares/auth.middleware');
const multer = require('../middlewares/multer-config');

router.post('/', auth, multer, articleCtrl.createArticle);
router.get('/', auth, articleCtrl.getAllArticles);
router.get('/:id', auth, articleCtrl.getOneArticle);
router.put('/:id', auth, multer, articleCtrl.updateArticle);
router.delete('/:id', auth, multer, articleCtrl.deleteArticle);

module.exports = router;