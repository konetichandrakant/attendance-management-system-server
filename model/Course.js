const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  name: { type: String, default: '' },
  year: { type: Number, default: '' },
  semester: { type: Number, default: '' },
  teacherId: { type: String, default: '' },
  teacherName: { type: String, default: '' },
  classesTaken: {
    type: [{ type: String }],
    default: []
  },
  students: {
    type: [{
      studentId: { type: String },
      classesAttended: [{ type: String }]
    }],
    default: []
  }
})

const Course = mongoose.model('Course', courseSchema);

module.exports = { Course };