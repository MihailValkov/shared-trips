const router = require('express').Router();
const controller = require('../controllers/user');
const { isAuthNeeded } = require('../middlewares/authentication');

router.get('/profile', isAuthNeeded(), controller.get.profile);
router.get('/logout', isAuthNeeded(), controller.get.logout);

router.post('/login', isAuthNeeded(false), controller.post.login);
router.post('/register', isAuthNeeded(false), controller.post.register);

router.post('/edit-profile', isAuthNeeded(true), controller.post.editProfile);
router.post('/edit-user-photo', isAuthNeeded(true), controller.post.editUserPhoto);

module.exports = router;