const router = require('express').Router();

const checkAdmin = require('../middleware/check-admin');
const orderController = require('../controllers/order');

router.get('/', checkAdmin, orderController.getOrders);
router.post('/', orderController.addOrder);
router.delete('/', checkAdmin, orderController.delOrders);

module.exports = router;