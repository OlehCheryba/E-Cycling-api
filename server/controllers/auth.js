const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Token = require('../models/token');
const User = require('../models/user');

module.exports = {
  signup: (req, res) => {
    User.findOne({ email: req.body.email }).exec()
      .then(user => {
        if (user !== null) return res.status(409).json({message: 'Mail has already used'});
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
          if (err) return res.status(500).json({error: err});
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash,
            role: 'user'
          });
          const newTokens = Token.create(user._id, user.role)
          const token = new Token({
            _id: user._id,
            tokenList: { [newTokens.refreshToken.replace(/\./g, '__')]: 'reg11' } }
          );
          token.save()
            .then(() => {
              user.save()
                .then(() => {
                  res.status(200).json(newTokens);
                });
            });
        });
      });
  },
  login: (req, res) => {
    console.log(req.ip,
      req.connection.remoteAdress)
    User.findOne({ email: req.body.email }).exec()
      .then(user => {
        if (user === null) return res.status(401).json({message: 'Login failed'});
        bcrypt.compare(req.body.password, user.password, async (err, result) => {
          if (err || !result) return res.status(401).json({message: 'Login failed'});
          const newTokens = Token.create(user._id, user.role)
          const { tokenList } = await Token.findById(user._id)
          await Token.findByIdAndUpdate(
            user._id,
            { tokenList: { ...tokenList, [newTokens.refreshToken]: 'login11' } }
          );
          res.status(200).json(newTokens);
        });
      });
  },
  createTokens: async (req, res) => {
    const token = req.body.refreshToken;
    try {
      const decoded = await jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      const { tokenList } = await Token.findById(decoded.userId)
      if (!(token in tokenList)) throw new Error

      delete tokenList[token]
      const newTokens = Token.create(decoded.userId, decoded.role)
      await Token.findByIdAndUpdate(
        decoded.userId, 
        { tokenList: { ...tokenList, [newTokens.refreshToken]: '21' } }
      );
      res.status(200).json(newTokens);
    } catch (e) {
      res.status(401).json({message: 'Bad Refresh Token'});
    }
  }
};
