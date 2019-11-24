const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  products: { type: Array, default: [] },
  id: String
}, { minimize: false });

module.exports = mongoose.model('Cart', cartSchema);