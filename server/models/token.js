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
        subject: String(userId)
      }
    )
  }
}

tokenSchema.static.isValid = (userId, jwt, ip) => {
  return new Promise(resolve => { 
    client.get(jwt.sub, (err, data) => {
      resolve(data === undefined || data === null || data < jwt.exp * 1000);
    });
  });
};

tokenSchema.statics.add = async (token, id) => {
  const { tokenList } = await Token.findById(id)
  await Token.findByIdAndUpdate(
    id,
    { tokenList: { ...tokenList, [token]: '11' } }
  );
};

tokenSchema.statics.revoke = (userId, token) => {
  client.del(userId[token]);
};

module.exports = mongoose.model('Token', tokenSchema);