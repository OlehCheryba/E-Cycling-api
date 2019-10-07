const router = require('express').Router();

const checkOwner = require('../middleware/check-owner');
const userController = require('../controllers/user');

router.post('/admin', checkOwner, (req, res) => {
  userController.changeRights(req.body.id, 'admin', res)
});
router.delete('/admin/:id', checkOwner, (req, res) => {
  userController.changeRights(req.params.id, 'user', res)
});
router.post('/owner', checkOwner, (req, res) => {
  userController.changeRights(req.body.id, 'owner', res)
});
router.delete('/owner/:id', checkOwner, (req, res) => { 
  userController.changeRights(req.params.id, 'user', res)
});

module.exports = router;
