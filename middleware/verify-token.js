const jwt = require('jsonwebtoken');

module.exports = {
  getRole(req) {
    return jwt.verify(
      req.signedCookies.accessToken, 
      process.env.JWT_ACCESS_SECRET, 
      (err, { role }) => err ? undefined : role
    );
  }
}