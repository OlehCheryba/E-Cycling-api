const productRouter     = require('express').Router();
const productController = require('../controllers/product');
const checkAdmin        = require('../middleware/check-admin');

productRouter.get('/', productController.getProducts);
productRouter.post('/', checkAdmin, productController.addFile, productController.addProduct);
productRouter.delete('/:productId', checkAdmin, productController.delProduct);

module.exports = productRouter;