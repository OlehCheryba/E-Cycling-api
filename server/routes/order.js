const router     = require('express').Router(),

      checkAdmin      = require('../middleware/check-admin'),
      orderController = require('../controllers/order');

router.get('/', checkAdmin, orderController.getOrders);
router.post('/', orderController.addOrder);
router.delete('/', checkAdmin, orderController.delOrders);

module.exports = router;