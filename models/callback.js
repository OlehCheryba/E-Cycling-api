const mongoose = require('mongoose');

const callbackSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  number: String,
  id: Number
});

module.exports = mongoose.model('Callback', callbackSchema);