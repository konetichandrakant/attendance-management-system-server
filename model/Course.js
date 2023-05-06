const mongoose = require('mongoose');

const courseSchema = mongoose.Schema(
  {
    course_name: String,
    details: [
      {
        teacher_name: String,
        teacher_id: String,
        students_attendance: [
          {
            student_id: String,
            attendance: {
              present: Boolean,
              time_of_marking: Date
            }
          }
        ]
      }
    ]
  }
)

const Course = mongoose.model('Course', courseSchema);

module.exports = { Course };