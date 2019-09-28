const getRole = require('./get-role');

module.exports = (req, res, next) => {
  if (getRole(req.token) === 'admin' || 'owner') next();
};