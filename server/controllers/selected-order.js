const mongoose      = require('mongoose'),
      SelectedOrder = require('../models/selected-order');

module.exports = {
  getSelectedOrders: (req, res) => {
    SelectedOrder.find().exec().then(selectedOrderList => {
      res.send(selectedOrderList);
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
      .then(selectedOrder => {
        console.log(selectedOrder);
        res.send()
      })
      .catch(e => console.log(e))
  },
  delSelectedOrders: (req, res) => {
    SelectedOrder.remove().exec().then(result => {
      console.log(result);
      res.send();
    });
  }
}