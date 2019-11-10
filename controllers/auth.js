const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Token = require('../models/token');
const User = require('../models/user');

const cookieOptions = {
  maxAge: 9999999999,
  //httpOnly: true,
  //signed: true
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

module.exports = {
  signup: async (req, res) => {
    try {
      const dbUser = await User.findOne({ login: req.body.login });
      if (dbUser) return res.status(409).json({ message: 'This login is already in use' });
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        login: req.body.login,
        password: bcrypt.hash(req.body.password, 10),
        role: 'user'
      });
      await user.save();

      const newTokens = Token.create(user._id, user.role);
      const { browserId, haveId } = getBrowserId(req);
      const token = new Token({
        _id: user._id,
        tokenList: { [browserId]: jwt.decode(newTokens.refreshToken).jti }
      });
      await token.save();

      res.status(200)
        .cookie('accessToken', newTokens.accessToken, cookieOptions)
        .cookie('refreshToken', newTokens.refreshToken, cookieOptions);
      if (!haveId) res.cookie('browserId', browserId, cookieOptions);
      res.end();
    } catch (e) {
      res.status(400).json({ message: 'Signup failed' });
    }
  },
  login: async (req, res) => {
    try {
      const user = await User.findOne({ login: req.body.login });
      if (!user) throw new Error;
      const passwordMatch = await bcrypt.compare(req.body.password, user.password);
      if (!passwordMatch) throw new Error;

      const newTokens = Token.create(user._id, user.role);
      const { browserId, haveId } = getBrowserId(req);
      const { tokenList } = await Token.findById(user._id);
      tokenList[browserId] = jwt.decode(newTokens.refreshToken).jti;
      await Token.findByIdAndUpdate(user._id, { tokenList });

      res.status(200)
        .cookie('accessToken', newTokens.accessToken, cookieOptions)
        .cookie('refreshToken', newTokens.refreshToken, cookieOptions);
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
      const { userId } = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      const { tokenList } = await Token.findById(userId);
      delete tokenList[browserId];
      await Token.findByIdAndUpdate(userId, { tokenList });

      res.status(200)
        .clearCookie('accessToken')
        .clearCookie('refreshToken')
        .end();
    } catch (e) {
      res.status(401)
        .clearCookie('accessToken')
        .clearCookie('refreshToken')
        .json({ message: 'Logout failed' });
    }
  },
  createTokens: async (req, res) => {
    const token = req.signedCookies.refreshToken;
    const { browserId, haveId } = getBrowserId(req);
    try {
      if (!haveId || !token) throw new Error;
      const decoded = await jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      const { tokenList } = await Token.findById(decoded.userId);
      if (tokenList[browserId] !== decoded.jti) throw new Error;

      const newTokens = Token.create(decoded.userId, decoded.role);
      tokenList[browserId] = jwt.decode(newTokens.refreshToken).jti;
      await Token.findByIdAndUpdate(decoded.userId, { tokenList });

      res.status(200)
        .cookie('accessToken', newTokens.accessToken, cookieOptions)
        .cookie('refreshToken', newTokens.refreshToken, cookieOptions)
        .end();
    } catch (e) {
      res.status(401).json({ message: 'Please relogin' });
    }
  },
  me: async(req, res) => {
    try {
      const token = req.signedCookies.accessToken;
      console.log(req.signedCookies)
      console.log(req.cookies) 
      const decoded = await jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      console.log(decoded)
      const user = await User.findOneById(decoded.userId);
      console.log(user)
      res.status(200).json({ userId: decoded.userId });
    } catch(e) {
      res.status(403).json({ message: 'You are not logined' });
    }
  }
};
