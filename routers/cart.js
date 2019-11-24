const router = require('express').Router();

const cartController = require('../controllers/cart');

router.post('/', cartController.createCart);
router.get('/my/items', cartController.getProducts);
router.delete('/my/products', cartController.deleteProducts);
router.put('/my/products/:productid', cartController.putProduct);
router.delete('/my/products/:productid', cartController.deleteProduct);

module.exports = router;