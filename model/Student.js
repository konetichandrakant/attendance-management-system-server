const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  name: { type: String, default: '' },
  password: { type: String, default: '' },
  email: { type: String, default: '' },
  phoneNumber: { type: String, default: '' },
  courses: {
    type: [{ type: String }],
    default: []
  }
})

const Student = mongoose.model('StudentDetails', studentSchema);

module.exports = { Student };