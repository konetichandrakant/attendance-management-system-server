const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  password: { type: String },
  name: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  attendanceDetails: [{
    courseId: { type: String },
    classesAttended: [{ type: String }],
  }]
})

const Student = mongoose.model('StudentDetails', studentSchema);

module.exports = { Student };