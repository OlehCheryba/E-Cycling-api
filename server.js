const express             = require('express');
const app                 = express();
const bodyParser          = require('body-parser');
const mongoose            = require('mongoose');
require('dotenv').config({ path: "/"});

const homeRouter          = require('./server/routes/home');
const productRouter       = require('./server/routes/product');
const orderRouter         = require('./server/routes/order');
const selectedOrderRouter = require('./server/routes/selected-order');
const callMeRouter        = require('./server/routes/call-me');
const userRouter          = require('./server/routes/user');

app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/', homeRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/selected-orders', selectedOrderRouter);
app.use('/call-me', callMeRouter);
app.use('/user', userRouter);

mongoose.connect("mongodb://localhost:27017/e-cycling", { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  app.listen(process.env.port || 3000, process.env.IP || '0.0.0.0', () => {
    console.log('Server is working');
  });
});