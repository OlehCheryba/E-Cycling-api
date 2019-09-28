const jwt = require('jsonwebtoken');

module.exports = token => {
  return jwt.verify(token, process.env.JWT_KEY, (err, decoded) => decoded.role );
};