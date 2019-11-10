const mongoose = require('mongoose');
const Callback = require('../models/callback');

module.exports = {
  getCallbacks: (req, res) => {
    Callback.find()
      .then(callbacksList => {
        res.status(200).json(callbacksList);
      });
  },
  addCallback: (req, res) => {
    const callback = new Callback({
      _id: new mongoose.Types.ObjectId(),
      number: req.body.number
    });
    callback.save()
      .then(() => {
        res.status(200).json({ message: 'Succesfully' });
      })
      .catch(() => {
        res.status(500).json({ message: 'Failed' });
      });
  },
  delCallbacks: (req, res) => {
    Callback.remove()
      .then(() => {
        res.status(200).json({ message: 'Succesfully' });
      });
  }
};