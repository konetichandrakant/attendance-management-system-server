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

const addCourse = async ({ courseId, courseName, semester, year, teacherId }) => {
  var course = new Course({ _id: courseId, courseName: courseName, semester: semester, year: year, teacherId: teacherId, classesTaken: [], students: [] });
  await course.save();
  return true;
}

const addStudentInCourse = async ({ courseId, studentId }) => {
  // Add student in course
  await Course.findByIdAndUpdate(courseId, { '$push': { 'students': { studentId: studentId, numberOfClassesPresent: 0 } } }, { upsert: true })

  // Add course in student
  await Student.findByIdAndUpdate(studentId, { '$push': { 'attendanceDetails': { courseId: courseId, classesAttended: [] } } }, { upsert: true })
  return true;
}

const addStudent = async ({ studentId, password, email, phoneNumber }) => {
  await Student.findByIdAndUpdate(studentId, { password: password, email: email, phoneNumber: phoneNumber }, { upsert: true });
}

const addTeacher = async ({ teacherId, password, email, phoneNumber }) => {
  await Teacher.findByIdAndUpdate(teacherId, { password: password, email: email, phoneNumber: phoneNumber }, { upsert: true });
}

const changeStudentPassword = async ({ studentId, password, newPassword }) => {
  const studentDetails = await Student.findById(studentId);
  if (!studentDetails || studentDetails['password'] !== password)
    return false;
  await Student.findByIdAndUpdate(studentId, { password: newPassword });
  return true;
}

const changeTeacherPassword = async ({ teacherId, password, newPassword }) => {
  const teacherDetails = await Teacher.findById(teacherId);
  if (!teacherDetails || teacherDetails['password'] !== password)
    return false;
  await Teacher.findByIdAndUpdate(teacherId, { password: newPassword });
  return true;
}

module.exports = { teacherDetails, studentDetails, courseDetails, addCourse, addStudentInCourse, addStudent, addTeacher, changeStudentPassword, changeTeacherPassword };