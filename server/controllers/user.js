const User = require('../models/user');
const Token = require('../models/token');

module.exports = {
  changeRights(userId, role, res) {
    User.findByIdAndUpdate(userId, {role})
      .then(() => {
        Token.revoke(userId);
        res.status(200).json({message: 'Successfully'});
      })
      .catch(() => {
        res.status(500).json({message: 'Error'});
      });
  }
};
