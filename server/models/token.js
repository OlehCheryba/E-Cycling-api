const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const tokenSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  tokenList: Object
});

tokenSchema.statics.create = (userId, role) => {
  return {
    accessToken: jwt.sign(
      {
        userId, role
      },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: process.env.JWT_ACCESS_TIME
      }
    ),
    refreshToken: jwt.sign(
      {
        userId, role
      },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: process.env.JWT_REFRESH_TIME,
        jwtid: String(new mongoose.Types.ObjectId())
      }
    )
  }
}

module.exports = mongoose.model('Token', tokenSchema);