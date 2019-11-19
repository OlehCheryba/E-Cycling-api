const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  login: String,
  email: String,
  password: String,
  role: String,
  id: Number,
  tokenList: Object
});

module.exports = mongoose.model('Customer', customerSchema);