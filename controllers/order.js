const mongoose = require('mongoose');
const Order = require('../models/order');

module.exports = {
  getOrders: (req, res) => {
    Order.find()
      .then(orderList => {
        res.status(200).json(orderList);
      });
  },
  addOrder: (req, res) => {
    const order = new Order({
      _id: new mongoose.Types.ObjectId(),
      number: req.body.number,
      list: req.body.list
    });
    order.save()
      .then(() => {
        res.status(200).json({ message: 'Succesfully' });
      })
      .catch(() => {
        res.status(500).json({ message: 'Failed' });
      });
  },
  delOrders: (req, res) => {
    Order.remove()
      .then(() => {
        res.status(200).json({ message: 'Succesfully' });
      });
  }
};