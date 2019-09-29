const router           = require('express').Router(),

      checkAdmin       = require('../middleware/check-admin'),
      callMeController = require('../controllers/call-me');

router.get('/', checkAdmin, callMeController.getCallMe);
router.post('/', callMeController.addCallMe);
router.delete('/',checkAdmin, callMeController.delCallMe);

module.exports = router;