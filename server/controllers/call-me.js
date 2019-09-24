const mongoose = require('mongoose');
const CallMe   = require('../models/call-me');

module.exports = {
  getCallMe: (req, res) => {
    CallMe.find().exec().then(callMeList => {
      res.send(callMeList);
    });
  },
  addCallMe: (req, res) => {
    const callMe = new CallMe({
      _id: new mongoose.Types.ObjectId(),
      number: req.body.number
    });
    callMe.save()
      .then(callMe => {
        console.log(callMe);
        res.send()
      })
      .catch(e => console.log(e))
  },
  delCallMe: (req, res) => {
    CallMe.remove().exec().then(result => {
      console.log(result);
      res.send();
    });
  }
}