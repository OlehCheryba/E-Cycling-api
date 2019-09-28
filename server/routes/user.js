const userRouter     = require('express').Router();
const checkOwner     = require('../middleware/check-owner');
const userController = require('../controllers/user');

userRouter.post('/signup', userController.signup);
userRouter.post('/login', userController.login);

module.exports = userRouter;