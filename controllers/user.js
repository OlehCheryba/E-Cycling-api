const mongoose = require('mongoose');
const bcrypt   = require("bcrypt");

const User     = require('../models/user');

module.exports = {
  signup: (req, res) => {
    User.find({ email: req.body.email }).exec()
      .then(user => {
        if (user.length >= 1) return res.json({ message: "Mail has already used" });
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) return res.json({ error: err });
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash
          });
          user.save().then(result => {
              res.json({ message: "User created" });
            });
        });
      });
  },
  login: (req, res) => {
    console.log(req.body);
    res.json({
      massage: 'Login successful'
    });
  }
}