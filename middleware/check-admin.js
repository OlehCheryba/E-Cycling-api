const fetchCustomerData = require('./fetch-customer-data');

module.exports = (req, res, next) => {
  const data = fetchCustomerData(req);
  if (!data) {
    res.sendStatus(401);
  }
  
  if (data.role === 'admin' || data.role === 'owner') {
    next();
  } else {
    res.sendStatus(403);
  }
};