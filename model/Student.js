const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  password: String,
  name: String,
  email: String,
  phone_number: String,
  attendance_details: [
    {
      current_semester: Number,
      attendance_course: [
        {
          course_id: String,
          course_name: String
        }
      ]
    }
  ]
})

const Student = mongoose.model('StudentDetails', studentSchema);

module.exports = { Student };