const router = require('express').Router();

const checkAdmin = require('../middleware/check-admin');
const selectedOrderController = require('../controllers/selected-order');

router.get('/', checkAdmin, selectedOrderController.getSelectedOrders);
router.post('/', selectedOrderController.addSelectedOrder);
router.delete('/', checkAdmin, selectedOrderController.delSelectedOrders);

module.exports = router;