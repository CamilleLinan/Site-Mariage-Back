const express = require('express');
const router = express.Router();

const guestCtrl = require('../controllers/guest.controllers');

const auth = require('../middlewares/auth.middleware');

router.post('/', auth, guestCtrl.createGuest);
router.get('/', auth, guestCtrl.getAllGuests);
router.get('/:id', auth, guestCtrl.getOneGuest);

module.exports = router;