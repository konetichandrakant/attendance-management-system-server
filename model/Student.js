const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  password: { type: String },
  name: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  courses: {
    type: [{ type: String }],
    default: []
  }
})

const Student = mongoose.model('StudentDetails', studentSchema);

module.exports = { Student };