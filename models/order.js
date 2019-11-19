const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  number: String,
  list: Object,
  id: Number
});

module.exports = mongoose.model('Order', orderSchema);