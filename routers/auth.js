const router = require('express').Router();

const authController = require('../controllers/auth');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.delete('/login', authController.logout);
router.get('/token', authController.createTokens);
router.get('/me', authController.me);

module.exports = router;