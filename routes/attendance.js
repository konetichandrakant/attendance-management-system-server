const express = require('express');
const router = express.Router();

const { Course } = require('../model/Course')
const { courseDetails } = require('../details');

router.post('/student-attendance', async (req, res) => {
  const { studentId, courseId, dateAndTime } = req.body;
  const courseData = { ...courseDetails(courseId) };
  if (!courseData)
    return res.send({ valid: false });
  let changed = false;
  for (let i = 0; i < courseData['students'].length; i++) {
    if (courseData['students'][i]['studentId'] === studentId) {
      courseData['students'][i]['classesAttended'].push(dateAndTime);
      changed = true;
      break;
    }
  }
  if (changed)
    await Course.findOneAndUpdate({ courseId: courseId }, courseData);
})

router.post('/teacher-attendance', async (req, res) => {
  const { teacherId, courseId, dateAndTime } = req.body;
  const courseData = { ...courseDetails(courseId) };
  if (!courseData || courseData['teacherId'] !== teacherId)
    return res.send({ valid: false });
  courseData['classesTaken'].push(dateAndTime);
  await Course.findOneAndUpdate({ courseId: courseId }, courseData)
})