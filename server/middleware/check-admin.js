const getRole = require('./get-role');

module.exports = (req, res, next) => {
  const role = getRole(req.headers.authorization);
  (role === 'admin' || role === 'owner') 
    ? next()
    : res.status(403).json({ message: 'No rights for this action' });
};