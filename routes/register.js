const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { Teacher } = require('../model/Teacher');
const { Student } = require('../model/Student');

dotenv.config();

app.get('/register', async (req, res) => {
  const data = req.body;
  data._id = data.user_id;
  delete data.user_id;

  const isTeacher = data.isTeacher;
  delete data.isTeacher;

  try {
    if (isTeacher) {
      const user = new Teacher(data);
      await user.save();
      return jwt.sign({ user_id }, process.env.ACCESS_KEY_TOKEN);
    }

  } catch (err) {

  }
})