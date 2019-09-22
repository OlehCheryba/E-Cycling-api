const express           = require('express');
const productController = require('../controllers/product');
const productRouter     = express.Router();

productRouter.get('/', productController.getProducts);
productRouter.post('/', productController.addFile, productController.addProduct);
productRouter.delete('/:productId', productController.delProduct);

module.exports = productRouter;