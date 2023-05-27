const express = require('express')
const router = express.Router();
const { studentDetails, courseDetails } = require('../details');

router.get('/', (req, res) => {
  const userId = req['userId'];
  const userDetails = studentDetails(userId);
  return userDetails ? res.send(userDetails) : res.send(false);
})

router.get('/:courseId', async (req, res) => {
  const { courseId, studentId } = req.params;
  const course = courseDetails(courseId);
  const userDetails = studentDetails(studentId);

  if (!course || !userDetails)
    return res.send(false);

  const attendanceDetails = userDetails['attendanceDetails'];
  for (let i = 0; i < attendanceDetails.length; i++) {
    if (attendanceDetails[i]['courseId'] === courseId) {
      return res.send(attendanceDetails[i]);
    }
  }
  return res.send(false);
})

module.exports = { studentRoutes: router };