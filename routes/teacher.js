const express = require('express')
const router = express.Router();

const { addCourse, addStudentInCourse, studentDetails, teacherDetails, courseDetails } = require('../details');
const { isLoggedIn } = require('../logInValidation');

/*
courseName: String,
year: Number,
semester: Number,
teacherId: String,
classesTaken: [String],
students: [{
  studentId: String,
  numberOfClassesPresent: Number,
}]
*/

router.get('/', isLoggedIn, (req, res) => {
  const teacherId = req['userId'];
  res.send(teacherDetails(teacherId));
})

router.post('/addCourse', isLoggedIn, (req, res) => {
  const { courseName, year, semester, courseId } = req.body;
  const teacherId = req['userId'];
  res.send(addCourse({ courseId, courseName, semester, year, teacherId }))
})

router.post('/addStudent', isLoggedIn, (req, res) => {
  const { courseId, studentId } = req.body;
  res.send(addStudentInCourse(courseId, studentId))
})

router.get('/:courseId', isLoggedIn, (req, res) => {
  const { courseId } = req.params;
  const teacherId = req['userId'];

  const course = courseDetails(courseId);

  if (!course || !course['teacherId'] !== teacherId)
    return res.send(false);

  return res.send(course);
})

router.get('/:courseId/:studentId', isLoggedIn, async (req, res) => {
  const { courseId, studentId } = req.params;

  const teacherId = req['userId'];
  const course = courseDetails(courseId);
  const userDetails = studentDetails(studentId);

  if (!course || !userDetails || course['teacherId'] !== teacherId)
    return res.send(false);

  const attendanceDetails = userDetails['attendanceDetails'];
  for (let i = 0; i < attendanceDetails.length; i++) {
    if (attendanceDetails[i]['courseId'] === courseId) {
      return res.send(attendanceDetails[i]);
    }
  }
  return res.send(false);
})

module.exports = { teacherRoutes: router };