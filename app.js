const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

const productRouter = require('./routers/product');
const orderRouter = require('./routers/order');
const selectedOrderRouter = require('./routers/selected-order');
const callbackRouter = require('./routers/callback');
const userRouter = require('./routers/user');
const authRouter = require('./routers/auth');

app.use(cors());
app.use(cookieParser(process.env.COOKIES_SECRET));
app.use(bodyParser.json());

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/selected-orders', selectedOrderRouter);
app.use('/callbacks', callbackRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

module.exports = app;