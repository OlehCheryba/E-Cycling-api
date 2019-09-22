const express                 = require('express');
const selectedOrderController = require('../controllers/selected-order');
const selectedOrderRouter     = express.Router();

selectedOrderRouter.get('/', selectedOrderController.getSelectedOrders);
selectedOrderRouter.post('/', selectedOrderController.addSelectedOrder);
selectedOrderRouter.delete('/', selectedOrderController.delSelectedOrders);

module.exports = selectedOrderRouter;