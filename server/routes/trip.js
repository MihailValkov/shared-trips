const router = require('express').Router();
const controller = require('../controllers/trip');
const { isOwner, isAuthNeeded } = require('../middlewares/authentication');

router.get('/list', controller.get.list);
router.get('/item/:tripId', controller.get.item);
router.get('/own-trips', isAuthNeeded(), controller.get.ownTrips);

router.post('/create', isAuthNeeded(), controller.post.create);
router.post('/edit/:tripId', isOwner(), controller.post.edit);

router.get('/delete/:tripId', isOwner(), controller.get.delete);
router.get('/join/:tripId', isAuthNeeded(), controller.get.join);

module.exports = router;