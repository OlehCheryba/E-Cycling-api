const router = require('express').Router();

const cartController = require('../controllers/cart');

router.post('/', cartController.createCart);
router.get('/my/products', cartController.getProducts);
router.delete('/my/products', cartController.deleteProducts);
router.put('/my/products/:productId', cartController.putProduct);
router.delete('/my/products/:productId', cartController.deleteProduct);

module.exports = router;