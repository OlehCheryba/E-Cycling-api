const router = require('express').Router();

const checkAdmin = require('../middleware/check-admin');
const callMeController = require('../controllers/call-me');

router.get('/', checkAdmin, callMeController.getCallMe);
router.post('/', callMeController.addCallMe);
router.delete('/',checkAdmin, callMeController.delCallMe);

module.exports = router;