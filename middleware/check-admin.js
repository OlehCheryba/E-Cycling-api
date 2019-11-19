const fetchUserData = require('./fetch-user-data');

module.exports = (req, res, next) => {
  const { role } = fetchUserData(req);
  if (!role) res.status(403).json({ message: 'Your token is bad' });
  else if (role === 'admin' || role === 'owner') next();
  else res.status(403).json({ message: 'You have no rights' });
};