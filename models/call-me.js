const mongoose = require('mongoose');

const callMeSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  number: String
});

module.exports = mongoose.model('CallMe', callMeSchema);