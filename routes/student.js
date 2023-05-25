const express = require('express')
const router = express.Router();
const { studentDetails, teacherDetails, courseDetails } = require('../details');

router.get('/', (req, res) => {
  const userId = req['userId'];
  const userDetails = studentDetails(userId);
  return userDetails ? res.send(userDetails) : res.send({ valid: false });
})

router.get('/:courseId', async (req, res) => {
  const { courseId, studentId } = req.params;
  const courseDetails = courseDetails(courseId);
  const userDetails = studentDetails(studentId);
  
  if (!courseDetails || !userDetails)
    return res.send({ valid: false });

  const attendanceDetails = userDetails['attendanceDetails'];
  for (let i = 0; i < attendanceDetails.length; i++) {
    if (attendanceDetails[i]['courseId'] === courseId) {
      return res.send(attendanceDetails[i]);
    }
  }
  return res.send({ valid: false });
})

module.exports = { studentRoutes: router };