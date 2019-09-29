const jwt = require('jsonwebtoken');

module.exports = token => 
  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => 
    err ? '' : decoded.role
  );