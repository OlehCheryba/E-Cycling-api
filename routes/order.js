const orderRouter     = require('express').Router();
const orderController = require('../controllers/order');

orderRouter.get('/', orderController.getOrders);
orderRouter.post('/', orderController.addOrder);
orderRouter.delete('/', orderController.delOrders);

module.exports = orderRouter;