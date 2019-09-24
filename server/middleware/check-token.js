const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    jwt.verify(req.headers.authorization, process.env.JWT_KEY);
    next();
  } catch (err) {
    return res.json({ message: 'Auth failed' });
  }
};