const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
  password: String,
  name: String,
  email: String,
  phone_number: String,
  courses_enrolled: [
    {
      academic_year: String,
      course_details: [
        {
          course_id: String,
          course_name: String,
          no_of_students: Number
        }
      ]
    }
  ]
})

const Teacher = mongoose.model('TeacherDetails', teacherSchema);

module.exports = { Teacher };