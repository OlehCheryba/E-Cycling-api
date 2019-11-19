const Customer = require('../models/customer');

module.exports = {
  getCustomers: async (req, res) => {
    const pageSize = +req.query.size;
    const skipCount = (req.query.page - 1) * pageSize;
    const totalCount = await Customer.countDocuments();
    const customers = await Customer.find().limit(pageSize).skip(skipCount);
    res.status(200).json({
      customers,
      totalCount
    });
  },
  getCustomer: async (req, res) => {
    const customer = await Customer.findOne({ id: req.params.customerId });
    res.status(200).json(customer);
  },
  changeRights(customerId, role, res) {
    Customer.findOneAndUpdate({ id: customerId }, { role, tokenList: {} })
      .then(() => {
        res.status(200).json({ message: 'Successfully' });
      })
      .catch(() => {
        res.status(500).json({ message: 'Error' });
      });
  }
};
