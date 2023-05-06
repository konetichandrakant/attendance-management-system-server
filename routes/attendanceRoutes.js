const express = require('express');
const app = express();
const { isLoggedIn } = require('../logInValidation');
const { studentDetails } = require('../model/Student')
const teacherDetails = require('../model/Teacher')

app.get('/attendance', isLoggedIn, (req, res) => {
  const { course_id } = req.query;
  const user = req.user;

  if (course_id === null) {
    const userObj = studentDetails.findById(user);
  }

  let obj = null;
  res.send(
    obj === null ? { isValid: false } : { isValid: true, attendance: obj }
  );
})
