const express = require('express')
const router = express.Router();
const { studentDetails, courseDetails } = require('../details');

router.get('/', (req, res) => {
  const studentId = req['userId'];
  const studentData = studentDetails(userId);
  if (!studentData)
    return res.send(false);
  res.send({ id: studentId, courses: studentData['courses'] });
})

router.get('/:courseId', async (req, res) => {
  const { courseId, studentId } = req.params;

  const teacherId = req['userId'];
  const courseData = await courseDetails(courseId);
  const studentData = await studentDetails(studentId);

  if (!courseData || courseData['teacherId'] !== teacherId)
    return res.send(false);

  for (let i = 0; i < courseData['students'].length; i++) {
    if (courseData['students'][i] === studentId) {
      return res.send({
        courseName: courseData['name'],
        courseYear: courseData['year'],
        semester: courseData['semester'],
        studentName: studentData['name'],
        attendance: courseData['students'][i]['classesAttended']
      });
    }
  }
  return res.send(false);
})

module.exports = { studentRoutes: router };