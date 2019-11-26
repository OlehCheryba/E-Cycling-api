const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

const customerRouter = require('./routers/customer');
const orderRouter = require('./routers/order');
const selectedOrderRouter = require('./routers/selected-order');
const callbackRouter = require('./routers/callback');
const productRouter = require('./routers/product');
const authRouter = require('./routers/auth');
const cartRouter = require('./routers/cart');

app.use(cors({
	origin: 'http://localhost:8000',
	credentials: true
}));
app.use(cookieParser(process.env.COOKIES_SECRET));
app.use(bodyParser.json());

app.use('/images', express.static('public'))
app.use('/customers', customerRouter);
app.use('/auth', authRouter);
app.use('/carts', cartRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/selected-orders', selectedOrderRouter);
app.use('/callbacks', callbackRouter);

app.use((req, res) => {
  res.sendStatus(404);
});

module.exports = app;