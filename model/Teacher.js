const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
  password: { type: String },
  name: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  coursesEnrolled: [{
    courseId: { type: String },
    noOfClassesTaken: { type: Number },
  }]
})

const Teacher = mongoose.model('TeacherDetails', teacherSchema);

module.exports = { Teacher };