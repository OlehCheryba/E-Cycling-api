const router = require('express').Router();
const multer = require('multer');

const checkAdmin = require('../middleware/check-admin');
const productController = require('../controllers/product');

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  }),
  limits: {
    fileSize: 2048 * 2048 * 5
  }
});

router.get('/', productController.getProducts);
router.post('/', checkAdmin, upload.single('photo'), productController.addProduct);
router.get('/:productId', productController.getProduct);
router.delete('/:productId', checkAdmin, productController.delProduct);

module.exports = router;