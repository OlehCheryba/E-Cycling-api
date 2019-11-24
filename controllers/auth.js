const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { getNextSequence } = require('../db');
const Customer = require('../models/customer');
const Cart = require('../models/cart');

const cookieOptions = {
  maxAge: 9999999999,
  httpOnly: true,
  signed: true
};
const getBrowserId = req => {
  const browserId = req.signedCookies.browserId;
  if (browserId) { 
    return { 
      browserId, 
      haveId: true 
    }
  } else {
    return { 
      browserId: new mongoose.Types.ObjectId(),
      haveId: false 
    };
  }
};
const createTokens = (customerId, role) => {
  return {
    accessToken: jwt.sign(
      {
        customerId, role
      },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: process.env.JWT_ACCESS_TIME
      }
    ),
    refreshToken: jwt.sign(
      {
        customerId, role
      },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: process.env.JWT_REFRESH_TIME,
        jwtid: String(new mongoose.Types.ObjectId())
      }
    )
  }
}
const summCarts = async (newCartId, oldCartId) => {
  try {
    let newCart = await Cart.findOne({ id: newCartId });
    if (!newCart) {
      newCart = new Cart({ 
        _id: new mongoose.Types.ObjectId(),
        id: newCartId,
        items: {},
        totalCount: 0
      });
    }
    const oldCart = await Cart.findOneAndDelete({ id: oldCartId });

    Object.entries(oldCart.items).map(([ key, value ]) => {
      if (!newCart.items[key]) {
        newCart.items[key] = value;
      } else {
        newCart.items[key] += value;
      }
      newCart.markModified(`items.${key}`);
    })
    newCart.totalCount += oldCart.totalCount;

    newCart.markModified('totalCount');
    await newCart.save();

  } catch (err) {
    throw err;
  }
}

module.exports = {
  signup: async (req, res) => {
    try {
      const dbCustomer = await Customer.findOne({ email: req.body.email });
      if (dbCustomer) return res.status(409).json({ message: 'This email is already in use' });
      
      const cartId = await getNextSequence('carts');
      const customer = new Customer({
        _id: new mongoose.Types.ObjectId(),
        login: req.body.login,
        email: req.body.email,
        password: bcrypt.hash(req.body.password, 10),
        role: 'customer',
        cartId,
        id: await getNextSequence('customers')
      });

      const newTokens = createTokens(customer.id, customer.role);
      const { browserId, haveId } = getBrowserId(req);
      customer.tokenList = { [browserId]: jwt.decode(newTokens.refreshToken).jti }
      customer.markModified('tokenList');
      await customer.save();

      await summCarts(customer.cartId, req.signedCookies.cartId);

      res.status(200)
        .cookie('accessToken', newTokens.accessToken, cookieOptions)
        .cookie('refreshToken', newTokens.refreshToken, cookieOptions)
        .cookie('cartId', customer.cartId, cookieOptions);
      if (!haveId) res.cookie('browserId', browserId, cookieOptions);
      res.end();
    } catch (e) {
      res.status(400).json({ message: 'Signup failed' });
    }
  },
  login: async (req, res) => {
    try {
      const customer = await Customer.findOne({ email: req.body.email });
      if (!customer) throw new Error;
      const passwordMatch = await bcrypt.compare(req.body.password, customer.password);
      if (!passwordMatch) throw new Error;

      const newTokens = createTokens(customer.id, customer.role);
      const { browserId, haveId } = getBrowserId(req);
      customer.tokenList[browserId] = jwt.decode(newTokens.refreshToken).jti;
      customer.markModified('tokenList');
      await customer.save();

      await summCarts(customer.cartId, req.signedCookies.cartId);      
      
      res.status(200)
        .cookie('accessToken', newTokens.accessToken, cookieOptions)
        .cookie('refreshToken', newTokens.refreshToken, cookieOptions)
        .cookie('cartId', customer.cartId, cookieOptions);
      if (!haveId) res.cookie('browserId', browserId, cookieOptions);
      res.end();
    } catch (e) {
      res.status(400).json({ message: 'Bad input' });
    }
  },
  logout: async (req, res) => {
    const token = req.signedCookies.refreshToken;
    const { browserId, haveId } = getBrowserId(req);
    try {
      if (!haveId || !token) throw new Error;
      const { customerId } = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

      const customer = await Customer.findOne({ id: customerId });
      delete customer.tokenList[browserId];
      customer.markModified('tokenList');
      await customer.save();

      res.status(200)
        .clearCookie('accessToken')
        .clearCookie('refreshToken')
        .clearCookie('cartId')
        .end();
    } catch (e) {
      res.status(401)
        .clearCookie('accessToken')
        .clearCookie('refreshToken')
        .clearCookie('cartId')
        .json({ message: 'Logout failed' });
    }
  },
  refreshTokens: async (req, res) => {
    const token = req.signedCookies.refreshToken;
    const { browserId, haveId } = getBrowserId(req);
    try {
      if (!haveId || !token) throw new Error;
      const decoded = await jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      const customer = await Customer.findOne({ id: decoded.customerId });
      if (customer.tokenList[browserId] !== decoded.jti) throw new Error;

      const newTokens = createTokens(customer.id, customer.role);
      customer.tokenList[browserId] = jwt.decode(newTokens.refreshToken).jti;
      customer.markModified('tokenList');
      await customer.save();

      res.status(200)
        .cookie('accessToken', newTokens.accessToken, cookieOptions)
        .cookie('refreshToken', newTokens.refreshToken, cookieOptions)
        .end();
    } catch (e) {
      res.status(401).json({ message: 'Please relogin' });
    }
  },
  me: async (req, res) => {
    try {
      const customer = await Customer.findOne(
        { id: req.userData.customerId }, 
        { _id: 0, login: 1, email: 1, role: 1, id: 1 }
      );
      if (!customer) throw new Error;

      res.status(200).json(customer);
    } catch (e) {
      if (req.signedCookies.refreshToken) {
        return res.status(403).json({ message: 'Please refresh your token' });
      }
      res.status(401).json({ message: 'You are not logined' });
    }
  }
};