const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const verifyToken = require('../middleware/verify-token');
const User = require('../models/user');

const createAccessToken = (email, userId, role) => {
  return jwt.sign(
    {
      email, userId, role
    },
    process.env.JWT_ACCESS_KEY,
    {
      expiresIn: "25s"
    }
  )
};
const createRefreshToken = (userId) => {
  return jwt.sign(
    {
      userId
    },
    process.env.JWT_REFRESH_KEY,
    {
      expiresIn: "60d"
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
            accessToken: createAccessToken(user.email, user._id, user.role),
            refreshToken: createRefreshToken(user._id)
          });
        });
      });
  },
  changeRights(id, role, res) {
    User.findByIdAndUpdate(id, {role}).exec()
      .then(user => {
        res.status(200).json({message: 'Successfully'});
      })
      .catch(() => {
        res.status(500).json({message: 'Error'});
      });
  },
  getNewToken(req, res) {
    jwt.verify(req.body.refreshToken, process.env.JWT_REFRESH_KEY, (err, decoded) => {
      if (err) return console.log(err);
      User.findById(decoded.userId).exec()
        .then(user => {
          res.status(200).json({
            accessToken: createAccessToken(user.email, user._id, user.role)
          });
        });
    });
  }
};