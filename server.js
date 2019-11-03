require('dotenv').config();
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const app = require('./app');

const port = process.env.port || 80;

mongoose.connect(
  process.env.MONGODB_URL, 
  { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => {
    app.listen(port, err => {
      if (err) return console.log(err);
      console.log(`API server is working on port ${port}`);
    });
  })
  .catch(err => {
    console.log(err);
  });