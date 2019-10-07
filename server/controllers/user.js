const User = require('../models/user');

module.exports = {
  changeRights(id, role, res) {
    User.findByIdAndUpdate(id, {role}).exec()
      .then(() => {
        res.status(200).json({message: 'Successfully'});
      })
      .catch(() => {
        res.status(500).json({message: 'Error'});
      });
  }
};
