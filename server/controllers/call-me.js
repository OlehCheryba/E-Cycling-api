const mongoose = require('mongoose');
const CallMe = require('../models/call-me');

module.exports = {
  getCallMe: (req, res) => {
    CallMe.find().exec()
      .then(callMeList => {
        res.status(200).json(callMeList);
      });
  },
  addCallMe: (req, res) => {
    const callMe = new CallMe({
      _id: new mongoose.Types.ObjectId(),
      number: req.body.number
    });
    callMe.save()
      .then(() => {
        res.status(200).json({message: 'Succesfully'});
      })
      .catch(e => {
        console.log(e);
        res.status(500).json({message: 'Failed'});
      });
  },
  delCallMe: (req, res) => {
    CallMe.remove().exec()
      .then(() => {
        res.status(200).json({message: 'Succesfully'});
      });
  }
};