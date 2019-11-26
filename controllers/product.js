const mongoose = require('mongoose');
const Product = require('../models/product');
const db = require('../db');

module.exports = {
  getProducts: async (req, res) => {
    const pageSize = +req.query.size;
    const skipCount = (req.query.page - 1) * pageSize;
    const totalCount = await Product.countDocuments();
    const products = await Product.find().limit(pageSize).skip(skipCount)
    res.status(200).json({
      products,
      totalCount
    });
  },
  addProduct: async (req, res) => {
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      photoSrc: req.body.photoSrc,
      id: await db.getNextSequence('products')
    });
    product.save()
      .then(() => {
        res.status(200).json({ message: 'Succesfully' });
      })
      .catch(() => {
        res.status(500).json({ message: 'Failed' });
      });
  },
  getProduct: async (req, res) => {
    try {
      const product = await Product.findOne({ id: req.params.productId });
      res.status(200).json({ product });
    } catch (e) {
      res.semdtatus(404);
    }
  },
  delProduct: (req, res) => {
    Product.deleteOne({ id: req.params.productId })
      .then(() => {
        res.status(200).json({ message: 'Succesfully' });
      });
  }
};