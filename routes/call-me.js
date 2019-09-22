const express          = require('express');
const callMeController = require('../controllers/call-me');
const callMeRouter     = express.Router();

callMeRouter.get('/', callMeController.getCallMe);
callMeRouter.post('/', callMeController.addCallMe);
callMeRouter.delete('/', callMeController.delCallMe);

module.exports = callMeRouter;