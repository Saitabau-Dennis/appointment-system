const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  phoneNumber: String,
  name: String
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
