const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  courseName: { type: String },
  year: { type: Number },
  semester: { type: Number },
  teacherId: { type: String },
  classesTaken: [{
    type: String
  }],
  students: [{
    studentId: { type: String },
    numberOfClassesPresent: { type: Number },
  }]
})

const Course = mongoose.model('Course', courseSchema);

module.exports = { Course };