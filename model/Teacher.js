const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
  name: { type: String, default: '' },
  password: { type: String, default: '' },
  email: { type: String, default: '' },
  phoneNumber: { type: String, default: '' },
  courses: {
    type: [{ type: String }],
    default: []
  }
})

const Teacher = mongoose.model('TeacherDetails', teacherSchema);

module.exports = { Teacher };