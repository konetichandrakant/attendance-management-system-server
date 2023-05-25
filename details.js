const { Student } = require('./model/Student');
const { Teacher } = require('./model/Teacher');
const { Course } = require('./model/Course');

const teacherDetails = async (id) => {
  return await Teacher.findById(id);
}

const studentDetails = async (id) => {
  return await Student.findById(id);
}

const courseDetails = async (id) => {
  return await Course.findById(id);
}

module.exports = { teacherDetails, studentDetails, courseDetails };