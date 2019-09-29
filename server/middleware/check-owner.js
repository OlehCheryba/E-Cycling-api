const getRole = require('./get-role');

module.exports = (req, res, next) => {
  getRole(req.headers.authorization) === 'owner'
    ? next()
    : res.status(403).json({message: 'No rights for this action'});
};