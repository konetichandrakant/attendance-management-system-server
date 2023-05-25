const express = require('express')
const router = express.Router();

const { studentDetails, teacherDetails, courseDetails } = require('../details');
const { isLoggedIn } = require('../logInValidation');

router.post('/addCourse', isLoggedIn, (req, res) => {

})

router.post('/addStudent', isLoggedIn, (req, res) => {
  const data = req.body;
  
})

router.get('/:courseId', isLoggedIn, (req, res) => {
  const { courseId } = req.params;
  const teacherId = req['userId'];

  const courseDetails = courseDetails(courseId);

  if (!courseDetails || !courseDetails['teacherId'] !== teacherId)
    return res.send({ valid: false });

  return res.send(courseDetails);
})

router.get('/:courseId/:studentId', isLoggedIn, async (req, res) => {
  const { courseId, studentId } = req.params;

  const teacherId = req['userId'];
  const courseDetails = courseDetails(courseId);
  const userDetails = studentDetails(studentId);

  if (!courseDetails || !userDetails || courseDetails['teacherId'] !== teacherId)
    return res.send({ valid: false });

  const attendanceDetails = userDetails['attendanceDetails'];
  for (let i = 0; i < attendanceDetails.length; i++) {
    if (attendanceDetails[i]['courseId'] === courseId) {
      return res.send(attendanceDetails[i]);
    }
  }
  return res.send({ valid: false });
})

module.exports = { teacherRoutes: router };