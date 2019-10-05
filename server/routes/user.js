const router = require('express').Router();

const checkOwner = require('../middleware/check-owner');
const userController = require('../controllers/user');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/token', userController.getNewToken);
router.delete('/:email')
router.post('/admin/:id', checkOwner, (req, res) => {
  userController.changeRights(req.params.id, 'admin', res)
});
router.delete('/admin/:id', checkOwner, (req, res) => {
  userController.changeRights(req.params.id, 'user', res)
});
router.post('/owner/:id', checkOwner, (req, res) => {
  userController.changeRights(req.params.id, 'owner', res)
});
router.delete('/owner/:id', checkOwner, (req, res) => { 
  userController.changeRights(req.params.id, 'user', res)
});
module.exports = router;
