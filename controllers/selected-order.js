const mongoose = require('mongoose');
const SelectedOrder = require('../models/selected-order');

module.exports = {
  getSelectedOrders: (req, res) => {
    SelectedOrder.find()
      .then(selectedOrderList => {
        res.status(200).json(selectedOrderList);
      });
  },
  addSelectedOrder: (req, res) => {
    const selectedOrder = new SelectedOrder({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      number: req.body.number,
      typeMotor: req.body.typeMotor,
      typeBattery: req.body.typeBattery,
      sizeWheel: req.body.sizeWheel,
      widthWheel: req.body.widthWheel,
      charger: req.body.charger,
      doublePendant: req.body.doublePendant,
      wings: req.body.wings,
      coment: req.body.coment
    });
    selectedOrder.save()
      .then(() => {
        res.status(200).json({ message: 'Succesfully' });
      })
      .catch(() => {
        res.status(500).json({ message: 'Failed' });
      });
  },
  delSelectedOrders: (req, res) => {
    SelectedOrder.remove()
      .then(() => {
        res.status(200).json({ message: 'Succesfully' });
      });
  }
};