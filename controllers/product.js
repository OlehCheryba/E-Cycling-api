const mongoose = require('mongoose');
const Product = require('../models/product');

module.exports = {
  getProducts: (req, res) => {
    Product.find()
      .then(productList => {
        res.status(200).json(productList);
      });
  },
  addProduct: (req, res) => {
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      fileName: req.body.fileName
    });
    product.save()
      .then((ww) => {
        console.log(ww)
        res.status(200).json({ message: 'Succesfully' });
      })
      .catch(e => {
        console.log(e);
        res.status(500).json({ message: 'Failed' });
      });
  },
  delProduct: (req, res) => {
    Product.remove({_id: req.params.productId})
      .then(() => {
        res.status(200).json({ message: 'Succesfully' });
      });
  }
};