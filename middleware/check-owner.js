const verifyToken = require('./verify-token');

module.exports = (req, res, next) => {
  const role = verifyToken.getRole(req);
  if (!role) res.status(403).json({ message: 'Your token is bad' });
  else if (role === 'owner') next();
  else res.status(403).json({ message: 'You have no rights' });
};