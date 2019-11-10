const router = require('express').Router();

const checkAdmin = require('../middleware/check-admin');
const callbackController = require('../controllers/callback');

router.get('/', checkAdmin, callbackController.getCallbacks);
router.post('/', callbackController.addCallback);
router.delete('/',checkAdmin, callbackController.delCallbacks);

module.exports = router;