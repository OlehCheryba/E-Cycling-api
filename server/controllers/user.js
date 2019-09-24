const mongoose = require('mongoose');
const bcrypt   = require("bcrypt");
const jwt      = require("jsonwebtoken");

const User     = require('../models/user');

const createToken = (email, userId) => {
  return jwt.sign(
    {
      email: email,
      userId: userId
    },
    process.env.JWT_KEY,
    {
        expiresIn: "1h"
    }
  );
}

module.exports = {
  signup: (req, res) => {
    User.findOne({ email: req.body.email }).exec()
      .then(user => {
        if (user !== null) return res.json({ message: "Mail has already been used" });
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) return res.json({ error: err });
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash
          });
          user.save()
            .then(result => {
              return res.json({
                message: "User created",
                token: createToken(user.email, user._id)
              });
            });
        });
      });
  },
  login: (req, res) => {
    User.findOne({ email: req.body.email }).exec()
      .then(user => {
        if (user === null) return res.json({ message: "Login failed" });
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err) return res.json({ message: "Login failed" });
          if (!result) return res.json({ message: "Login failed" });
          return res.json({
            message: "Login successful",
            token: createToken(user.email, user._id)
          });
        });
      });
  }
}