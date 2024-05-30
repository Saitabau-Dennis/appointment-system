const mongoose = require('mongoose');

const AppointmentSchema = mongoose.Schema({
  name: String,
  doctor: String,
  date: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
