const router     = require('express').Router(),

      checkAdmin        = require('../middleware/check-admin'),
      productController = require('../controllers/product');

router.get('/', productController.getProducts);
router.post('/', checkAdmin, productController.addFile, productController.addProduct);
router.delete('/:productId', checkAdmin, productController.delProduct);

module.exports = router;