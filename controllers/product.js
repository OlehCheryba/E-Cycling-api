const formidable = require('formidable');
const mv         = require('mv');
const mongoose   = require('mongoose');
const Product    = require('../models/product')

module.exports = {
  getProducts: (req, res) => {
    Product.find().exec().then(productList => {
      res.send(productList);
    });
  },
  addProduct: (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      if (err) return console.log(err)
      let ok = JSON.parse(fields.item);
      const oldpath = files.filetoupload.path;
      const newpath = 'img/products/' + files.filetoupload.name;
      mv(oldpath, newpath, e => {
        const product = new Product({
          _id: new mongoose.Types.ObjectId(),
          name: ok.name,
          price: ok.price,
          description: ok.description,
          fileName: ok.fileName
        });
        product.save()
          .then(product => {
            console.log(product);
            res.send()
          })
          .catch(e => console.log(e))
      });
    });
  },
  delProduct: (req, res) => {
    Product.remove({_id: req.params.productId}).exec().then(result => {
      console.log(result);
      res.send();
    });
  }
}