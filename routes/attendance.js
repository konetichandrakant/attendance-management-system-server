const express = require('express');
const router = express.Router();

const { Course } = require('../model/Course')
const { courseDetails } = require('../details');

router.post('/student-attendance', (req, res) => {
  const { studentId, courseId, dateAndTime } = req.body;
  const courseData = courseDetails(courseId);
  
})

router.post('/teacher-attendance', (req, res) => {
  const { studentId, courseId, dateAndTime } = req.body;
})

router.post('/teacher-attendance', (req, res) => {

})