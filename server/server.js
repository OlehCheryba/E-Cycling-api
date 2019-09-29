require('dotenv').config({ path: "/"});
const express             = require('express'),
      bodyParser          = require('body-parser'),
      mongoose            = require('mongoose'),
      app                 = express(),

      homeRouter          = require('./routes/home'),
      productRouter       = require('./routes/product'),
      orderRouter         = require('./routes/order'),
      selectedOrderRouter = require('./routes/selected-order'),
      callMeRouter        = require('./routes/call-me'),
      userRouter          = require('./routes/user');

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