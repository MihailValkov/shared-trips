const router = require('express').Router();
const controller = require('../controllers/admin');


router.get('/statistics', controller.get.statistics);
router.get('/logs', controller.get.logs);
router.get('/expensive-trips', controller.get.expensiveTrips);
router.get('/user/:id', controller.get.getUserById);
router.get('/user/delete/:id', controller.get.deleteUserById);
router.get('/users', controller.get.getUsers);
router.get('/trips', controller.get.getTrips);
router.get('/trip/delete/:id', controller.get.deleteTripById);

router.post('/user/:id', controller.post.updateUser);
router.post('/user/update-avatar/:id', controller.post.updateUserAvatar);

module.exports = router;