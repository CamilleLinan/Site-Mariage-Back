const express = require('express');
const router = express.Router();

// Import middlewares
const password = require('../middlewares/password.middleware');
const auth = require('../middlewares/auth.middleware');
const multer = require('../middlewares/multer-config');

// Import controllers
const userCtrl = require('../controllers/user.controller');

// Login routes
router.post('/signup', password, userCtrl.signup);
router.post('/signin', userCtrl.signin);

// User routes
router.get('/', auth, userCtrl.getAllUsers);
router.get('/:id', auth, userCtrl.getOneUser);
router.put('/:id', auth, userCtrl.updateUser);
router.put('/:id/password', auth, userCtrl.updatePassword);
router.put('/:id/picture', auth, multer, userCtrl.updateUserPhoto);
router.delete('/:id', auth, userCtrl.deleteUser);


module.exports = router;