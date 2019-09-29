const router                  = require('express').Router(),

      checkAdmin              = require('../middleware/check-admin'),
      selectedOrderController = require('../controllers/selected-order');

router.get('/', checkAdmin, selectedOrderController.getSelectedOrders);
router.post('/', selectedOrderController.addSelectedOrder);
router.delete('/', checkAdmin, selectedOrderController.delSelectedOrders);

module.exports = router;