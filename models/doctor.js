const mongoose = require('mongoose');

const DoctorSchema = mongoose.Schema({
  name: String,
  specialization: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Doctor', DoctorSchema);
