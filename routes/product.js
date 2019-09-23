const productRouter     = require('express').Router();
const productController = require('../controllers/product');

productRouter.get('/', productController.getProducts);
productRouter.post('/', productController.addFile, productController.addProduct);
productRouter.delete('/:productId', productController.delProduct);

module.exports = productRouter;