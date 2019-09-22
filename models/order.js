const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  number: String,
  list: Object
});

module.exports = mongoose.model('Order', orderSchema);