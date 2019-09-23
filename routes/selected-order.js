const selectedOrderRouter     = require('express').Router();
const selectedOrderController = require('../controllers/selected-order');

selectedOrderRouter.get('/', selectedOrderController.getSelectedOrders);
selectedOrderRouter.post('/', selectedOrderController.addSelectedOrder);
selectedOrderRouter.delete('/', selectedOrderController.delSelectedOrders);

module.exports = selectedOrderRouter;