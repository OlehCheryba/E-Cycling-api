const mongoose = require('mongoose');

const selectedOrderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  number: String,
  typeMotor: String,
  typeBattery: String,
  sizeWheel: String,
  widthWheel: String,
  charger: Boolean,
  doublePendant: Boolean,
  wings: Boolean,
  coment: String,
  id: Number
});

module.exports = mongoose.model('SelectedOrder', selectedOrderSchema);