const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  password: String,
  name: String,
  email: String,
  phoneNumber: String,
  attendanceDetails: [{
    courseId: String,
    classesAttended: [String],
  }]
})

const Student = mongoose.model('StudentDetails', studentSchema);

module.exports = { Student };