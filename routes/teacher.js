const express = require('express')
const router = express.Router();

const { addCourse, addStudentInCourse, studentDetails, teacherDetails, courseDetails } = require('../details');
const { isLoggedIn } = require('../logInValidation');

router.get('/', isLoggedIn, async (req, res) => {
  const teacherId = req['userId'];
  const teacherData = await teacherDetails(teacherId);
  if (!teacherData)
    return res.send(false);
  res.send({ teacherId: teacherId, courses: teacherData['courses'] });
})

router.post('/addcourse', isLoggedIn, async (req, res) => {
  const { courseName, year, semester, courseId } = req.body;
  const teacherId = req['userId'];
  res.send(await addCourse(courseId, courseName, semester, year, teacherId))
})

router.post('/addstudent', isLoggedIn, async (req, res) => {
  const { courseId, studentId } = req.body;
  res.send(await addStudentInCourse(courseId, studentId))
})

router.get('/:courseId', isLoggedIn, async (req, res) => {
  const { courseId } = req.params;
  const teacherId = req['userId'];

  const courseData = await courseDetails(courseId);

  if (!courseData || courseData['teacherId'] !== teacherId)
    return res.send(false);

  let data = {
    courseName: courseData['courseName'],
    year: courseData['year'],
    semester: courseData['semester'],
    classesTaken: courseData['classesTaken'],
    students: []
  };

  for (let i = 0; i < courseData['students'].length; i++) {
    if (courseData['students'][i]['studentId'] !== null)
      data['students'].push({ studentId: courseData['students'][i]['studentId'], noOfClassesAttended: courseData['students'][i]['classesAttended'].length });
  }

  return res.send(data);
})

router.get('/:courseId/:studentId', isLoggedIn, async (req, res) => {
  const { courseId, studentId } = req.params;

  const teacherId = req['userId'];

  const courseData = await courseDetails(courseId);
  let studentData = await studentDetails(studentId);

  if (!courseData || courseData['teacherId'] !== teacherId)
    return res.send(false);

  console.log(studentData);

  if (studentData === null)
    studentData = {};

  const studentName = (studentData['name'] === null) ? "Not Given" : studentData['name'];

  for (let i = 0; i < courseData['students'].length; i++) {
    if (courseData['students'][i]['studentId'] === studentId) {
      return res.send({
        courseId: courseData['courseId'],
        courseName: courseData['courseName'],
        year: courseData['year'],
        semester: courseData['semester'],
        teacherId: courseData['teacherId'],
        teacherName: courseData['teacherName'],
        studentName: studentName,
        studentId: studentId,
        studentAttendance: courseData['students'][i]['classesAttended'],
        teacherAttendance: courseData['classesTaken']
      });
    }
  }
  return res.send(false);
})

module.exports = { teacherRoutes: router };