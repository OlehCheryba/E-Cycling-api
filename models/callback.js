const mongoose = require('mongoose');

const callbackSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  number: String,
  id: String
});

module.exports = mongoose.model('Callback', callbackSchema);