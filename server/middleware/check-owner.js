const getRole = require('./get-role');

module.exports = (req, res, next) => {
  if (getRole(req.token) === 'owner') next();
};