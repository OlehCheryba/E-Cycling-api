const productRouter     = require('express').Router();
const productController = require('../controllers/product');
const checkToken        = require('../middleware/check-token');

productRouter.get('/', productController.getProducts);
productRouter.post('/', checkToken, productController.addFile, productController.addProduct);
productRouter.delete('/:productId', checkToken, productController.delProduct);

module.exports = productRouter;