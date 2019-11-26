const mongoose = require('mongoose');

const { getNextSequence } = require('../db');
const Cart = require('../models/cart');

const cookieOptions = {
  maxAge: 9999999999,
  httpOnly: true,
  signed: true
};

module.exports = {
  async createCart(req, res) {
    try {
      const cartId = req.signedCookies.cartId || await getNextSequence('carts');

      const newCart = new Cart({ 
        _id: new mongoose.Types.ObjectId(),
        id: cartId
      });
      await newCart.save();

      res.status(201)
        .set('Location', '/carts/my')
        .cookie('cartId', cartId, cookieOptions)
        .end();
    } catch (e) {
      res.sendStatus(500);
    }
  },

  async getProducts(req, res) {
    try {
      const cartId = req.signedCookies.cartId;
      const cart = await Cart.findOne({ id: cartId });

      if (!cart) {
        return res.status(200).json({ products: [] });
      }
      res.status(200).json({ products: cart.products });
    } catch (e) {
      res.sendStatus(500);
    }
  },

  async deleteProducts(req, res) {
    try {
      const cartId = req.signedCookies.cartId;
      const result = await Cart.updateOne({ id: cartId }, { products: [] });
      
      if (result.n === 0) {
        return res.sendStatus(404);
      }
      res.sendStatus(204);
    } catch (e) {
      res.sendStatus(500);
    }
  },

  async putProduct(req, res) {
    try {
      const cartId = req.signedCookies.cartId;
      const productToPutId = req.params.productId;
      const newProduct = req.body.product;

      const cart = await Cart.findOne({ id: cartId });
      if (!cart) {
        return res.sendStatus(404);
      }

      cart.products = cart.products.filter(({ id }) => id !== productToPutId);
      cart.products.push(newProduct);

      cart.markModified('products');
      await cart.save();

      res.sendStatus(204);
    } catch (e) {
      res.sendStatus(500);
    }
  },

  async deleteProduct(req, res) {
    try {
      const cartId = req.signedCookies.cartId;
      const productToDeleteId = req.params.productId;

      const cart = await Cart.findOne({ id: cartId });
      if (!cart) {
        return res.sendStatus(404);
      }

      cart.products = cart.products.filter((product) => product.id !== productToDeleteId);

      cart.markModified('products');
      await cart.save();

      res.sendStatus(204);
    } catch (e) {
      res.sendStatus(500);
    }
  }
};