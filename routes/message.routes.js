const express = require('express');
const router = express.Router();

// Import middlewares
const auth = require('../middlewares/auth.middleware');

// Import controllers
const messageCtrl = require('../controllers/message.controllers');

// Message routes
router.get('/', auth, messageCtrl.getAllMessages);
router.post('/', auth, messageCtrl.createMessage);
router.get('/:lastname/:firstname', auth, messageCtrl.findOwnMessages);
router.put('/:id', auth, messageCtrl.replyMessage);
router.post('/:id', auth, messageCtrl.readMessage);

module.exports = router;