const verifyToken = require('./verify-token');

module.exports = (req, res, next) => {
  const role = verifyToken.role(req.headers.authorization);
  if (role === 'owner') next();
  else if (role === 'bad') res.status(403).json({message: 'Your token is bad'});
  else res.status(403).json({message: 'You have no rights'});
};