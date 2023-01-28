const express = require('express');
const router = express.Router();

const guestCtrl = require('../controllers/guest.controllers');

const auth = require('../middlewares/auth.middleware');

router.post('/', auth, guestCtrl.createGuest);
router.get('/', auth, guestCtrl.getAllGuests);
router.get('/:id', auth, guestCtrl.getOneGuest);
router.put('/:id', auth, guestCtrl.updateGuest);
router.delete('/:id', auth, guestCtrl.deleteGuest);

router.get('/:lastname/:firstname', auth, guestCtrl.findSelf);
router.patch('/:lastname/:firstname', auth, guestCtrl.updateSelf);

module.exports = router;