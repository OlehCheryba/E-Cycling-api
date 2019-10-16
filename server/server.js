require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const app = require('./app');

const server = http.createServer(app);
const port = process.env.port || 80;

mongoose.connect(
  'mongodb://localhost:27017/e-cycling', 
  { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => {
    server.listen(port, err => {
      if (err) return console.log(err);
      console.log('Server is working');
    });
  })
  .catch(err => {
    console.log(err);
  });