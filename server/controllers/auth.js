const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Token = require('../models/token');
const User = require('../models/user');

const createAccessToken = (userId, role) => {
  return jwt.sign(
    {
      userId, role
    },
    process.env.JWT_ACCESS_KEY,
    {
      expiresIn: "25s"
    }
  )
};
const createRefreshToken = (userId, role) => {
  return jwt.sign(
    {
      userId, role
    },
    process.env.JWT_REFRESH_KEY,
    {
      expiresIn: "1000s",
      subject: String(userId)
    }
  )
};

module.exports = {
  signup: (req, res) => {
    User.findOne({ email: req.body.email }).exec()
      .then(user => {
        if (user !== null) return res.send(409).json({message: 'Mail has already used'});
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) return res.status(500).json({error: err});
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash,
            role: 'user'
          });
          user.save()
            .then(() => {
              res.status(200).json({
                message: 'User created',
                token: createToken(user.email, user._id, user.role)
              });
            });
        });
      });
  },
  login: (req, res) => {
    User.findOne({ email: req.body.email }).exec()
      .then(user => {
        if (user === null) return res.status(401).json({message: 'Login failed'});
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err) return res.status(401).json({message: 'Login failed'});
          if (!result) return res.status(401).json({message: 'Login failed'});
          res.status(200).json({
            message: 'Login successful',
            accessToken: createAccessToken(user._id, user.role),
            refreshToken: createRefreshToken(user._id, user.role)
          });
        });
      });
  },
  createAcessToken(req, res) {
    jwt.verify(req.body.refreshToken, process.env.JWT_REFRESH_KEY, async (err, decoded) => {
      console.log(await Token.isValid(decoded));
      if (err) return res.status(401).json({message: 'Bad Refresh Token'});
      if (!await Token.isValid(decoded)) {
        return res.status(401).json({message: 'Bad Refresh Token'});
      }
      res.status(200).json({acesssToken: createAccessToken(decoded.userId, decoded.role)});
    });
  }
};

Token.revoke('5d906a1097160d36e8ae2c46', 1000);