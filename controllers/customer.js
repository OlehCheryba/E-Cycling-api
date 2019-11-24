const Customer = require('../models/customer');

module.exports = {
  getCustomers: async (req, res) => {
    const pageSize = +req.query.size;
    const skipCount = (req.query.page - 1) * pageSize;
    const totalCount = await Customer.countDocuments();
    const customers = await Customer.find({}, { _id: 0, login: 1, role: 1, id: 1 }).limit(pageSize).skip(skipCount);
    res.status(200).json({
      customers,
      totalCount
    });
  },
  getCustomer: async (req, res) => {
    const customer = await Customer.findOne({ id: req.params.customerId }, { _id: 0, login: 1, role: 1, id: 1 });
    res.status(200).json(customer);
  },
  async changeRights(customerId, role, res) {
    try {
      await Customer.findOneAndUpdate({ id: customerId }, { role });
      res.status(200).json({ message: 'Successfully' });
    } catch  (e) {
      res.status(500).json({ message: 'Error' });
    }
  }
};
