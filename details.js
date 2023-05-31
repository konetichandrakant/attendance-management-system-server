const { Student } = require('./model/Student');
const { Teacher } = require('./model/Teacher');
const { Course } = require('./model/Course');

// all get data functions
const teacherDetails = async (id) => {
  return await Teacher.findById(id);
}

const studentDetails = async (id) => {
  return await Student.findOne({ userId: id});
}

const courseDetails = async (id) => {
  return await Course.findById(id);
}

// all post data functions
const addCourse = async (courseId, courseName, semester, year, teacherId) => {
  var course = new Course({ _id: courseId, name: courseName, semester: semester, year: year, teacherId: teacherId, classesTaken: [], students: [] });
  await course.save();
  return true;
}

const addStudentInCourse = async (courseId, studentId) => {
  // Add student in course
  await Course.findByIdAndUpdate(courseId, { '$push': { students: { studentId: studentId, classesAttended: [] } } }, { upsert: true })

  // Add course in student
  await Student.findByIdAndUpdate(studentId, { '$push': { attendanceDetails: { courseId: courseId, courseName: courseName } } }, { upsert: true })

  return true;
}

const addStudent = async (studentId, password, email, phoneNumber) => {
  await Student.findByIdAndUpdate(studentId, { password: password, email: email, phoneNumber: phoneNumber }, { upsert: true });
}

const addTeacher = async (teacherId, password, email, phoneNumber) => {
  await Teacher.findByIdAndUpdate(teacherId, { password: password, email: email, phoneNumber: phoneNumber }, { upsert: true });
}

// all update data functions
const changeStudentPassword = async (studentId, password, newPassword) => {
  const studentDetails = await Student.findById(studentId);
  if (!studentDetails || studentDetails['password'] !== password)
    return false;
  await Student.findByIdAndUpdate(studentId, { password: newPassword });
  return true;
}

const changeTeacherPassword = async (teacherId, password, newPassword) => {
  const teacherData = await Teacher.findById(teacherId);
  if (!teacherData || teacherData['password'] !== password)
    return false;
  await Teacher.findByIdAndUpdate(teacherId, { password: newPassword });
  return true;
}

const studentAttendance = async (studentId, courseId, dateAndTime) => {
  // add attendance in student
  const studentData = await Student.findById(studentId);
  const course = studentData['attendanceDetails']
  for (let i = 0; i < course.length; i++) {
    if (course[i]['courseId'] === courseId) {
      course[i]['classesAttended'] = [...course[i]['classesAttended'], dateAndTime];
    }
  }
  Student.findByIdAndUpdate(studentId, { attendanceDetails: course })

  // increase count in course
  const courseData = await Course.findById(courseId);

}

const teacherAttendance = async (teacherId, courseId, dateAndTime) => {
  // increase attendance count in teacher
  // add attendance in course
}

module.exports = { teacherDetails, studentDetails, courseDetails, addCourse, addStudentInCourse, addStudent, addTeacher, changeStudentPassword, changeTeacherPassword };