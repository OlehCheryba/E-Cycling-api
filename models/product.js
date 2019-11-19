const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: String,
  description: String,
  fileName: String,
  id: Number
});

module.exports = mongoose.model('Product', productSchema);