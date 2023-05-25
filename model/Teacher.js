const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
  password: String,
  name: String,
  email: String,
  phoneNumber: String,
  coursesEnrolled: [{
    courseId: String,
    courseName: String,
    noOfClassesTaken: Number,
  }]
})

const Teacher = mongoose.model('TeacherDetails', teacherSchema);

module.exports = { Teacher };