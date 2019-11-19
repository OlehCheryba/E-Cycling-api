const jwt = require('jsonwebtoken');

const fetchUserData = (req, res, next) => {
  return jwt.verify(
    req.signedCookies.accessToken, 
    process.env.JWT_ACCESS_SECRET, 
    (err, decoded) => {
      req.userData = decoded || {};
      if (next) return next();
      if (err) return;
      return decoded;
    }
  );
}
module.exports = fetchUserData;