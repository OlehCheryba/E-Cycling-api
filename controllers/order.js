const mongoose = require('mongoose');
const Order    = require('../models/order')

module.exports = {
  getOrders: (req, res) => {
    Order.find().exec().then(orderList => {
      res.send(orderList);
    });
  },
  addOrder: (req, res) => {
    const order = new Order({
      _id: new mongoose.Types.ObjectId(),
      number: req.body.number,
      list: req.body.list
    });
    order.save()
      .then(order => {
        console.log(order);
        res.send()
      })
      .catch(e => console.log(e))
  },
  delOrders: (req, res) => {
    Order.remove().exec().then(result => {
      console.log(result);
      res.send();
    });
  }
}