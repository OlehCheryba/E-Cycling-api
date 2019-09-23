const callMeRouter     = require('express').Router();
const callMeController = require('../controllers/call-me');

callMeRouter.get('/', callMeController.getCallMe);
callMeRouter.post('/', callMeController.addCallMe);
callMeRouter.delete('/', callMeController.delCallMe);

module.exports = callMeRouter;