const jwt = require('jsonwebtoken');

module.exports = {
  role(token) {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => 
      err ? 'bad' : decoded.role
    );
  }
}