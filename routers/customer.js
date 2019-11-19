const router = require('express').Router();

const checkOwner = require('../middleware/check-owner');
const customerController = require('../controllers/customer');

router.get('/', customerController.getCustomers);
router.get('/:customerId', customerController.getCustomer);
router.post('/admin', checkOwner, (req, res) => {
  customerController.changeRights(req.body.id, 'admin', res);
});
router.delete('/admin/:id', checkOwner, (req, res) => {
  customerController.changeRights(req.params.id, 'customer', res);
});
router.post('/owner', checkOwner, (req, res) => {
  customerController.changeRights(req.body.id, 'owner', res);
});
router.delete('/owner/:id', checkOwner, (req, res) => { 
  customerController.changeRights(req.params.id, 'customer', res);
});

module.exports = router;
