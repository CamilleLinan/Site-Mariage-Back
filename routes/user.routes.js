const express = require('express');
const router = express.Router();

// Import middlewares
const password = require('../middlewares/password.middleware');
const auth = require('../middlewares/auth.middleware');

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

module.exports = router;