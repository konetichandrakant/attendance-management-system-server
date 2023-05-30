const express = require('express')
const router = express.Router();
const { studentDetails, courseDetails } = require('../details');
const { isLoggedIn } = require('../logInValidation');

router.get('/', isLoggedIn, (req, res) => {
  const studentId = req['userId'];
  const studentData = studentDetails(userId);

  if (!studentData)
    return res.send(false);

  res.send({ id: studentId, courses: studentData['courses'] });
})

router.get('/:courseId', isLoggedIn, async (req, res) => {
  const { courseId } = req.params;

  const studentId = req['userId'];
  const courseData = await courseDetails(courseId);
  const studentData = await studentDetails(studentId);

  if (!courseData)
    return res.send(false);

  for (let i = 0; i < courseData['students'].length; i++) {
    if (courseData['students'][i] === studentId) {
      return res.send({
        courseId: courseData['courseId'],
        courseName: courseData['name'],
        year: courseData['year'],
        semester: courseData['semester'],
        teacherId: courseData['teacherId'],
        teacherName: courseData['teacherName'],
        studentName: studentData['name'],
        studentId: studentId,
        studentAttendance: courseData['students'][i]['classesAttended'],
        teacherAttendance: courseData['classesTaken']
      });
    }
  }
  return res.send(false);
})

module.exports = { studentRoutes: router };