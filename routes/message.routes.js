const express = require('express');
const router = express.Router();

// Import middlewares
const auth = require('../middlewares/auth.middleware');

// Import controllers
const messageCtrl = require('../controllers/message.controllers');

// Message routes
router.post('/', auth, messageCtrl.createMessage);
router.get('/', auth, messageCtrl.getAllMessages);
router.get('/:userId', auth, messageCtrl.findOwnMessages);
router.patch('/:id', auth, messageCtrl.replyMessage);
router.patch('/:id/msgIsRead', auth, messageCtrl.readMessage);
router.patch('/:id/resIsRead', auth, messageCtrl.readResponse);

module.exports = router;