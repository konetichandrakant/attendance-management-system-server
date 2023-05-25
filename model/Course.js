const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  courseName: String,
  year: Number,
  semester: Number,
  teacherId: String,
  teacherName: String,
  classesTaken: [String],
  students: [{
    studentId: String,
    numberOfClassesPresent: Number,
  }]
})

const Course = mongoose.model('Course', courseSchema);

module.exports = { Course };