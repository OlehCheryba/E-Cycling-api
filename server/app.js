const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

const homeRouter = require('./routes/home');
const productRouter = require('./routes/product');
const orderRouter = require('./routes/order');
const selectedOrderRouter = require('./routes/selected-order');
const callMeRouter = require('./routes/call-me');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');

app.use(cookieParser(process.env.COOKIES_SECRET));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/', homeRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/selected-orders', selectedOrderRouter);
app.use('/call-me', callMeRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

module.exports = app;