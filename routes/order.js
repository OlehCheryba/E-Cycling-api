const express         = require('express');
const orderController = require('../controllers/order');
const orderRouter     = express.Router();

orderRouter.get('/', orderController.getOrders);
orderRouter.post('/', orderController.addOrder);
orderRouter.delete('/', orderController.delOrders);

module.exports = orderRouter;