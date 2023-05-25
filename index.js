const express = require('express');
const app = express();
const dotenv = require('dotenv');
const jsonwebtoken = require('jsonwebtoken');
const { studentRoutes } = require('./routes/student');
const { teacherRoutes } = require('./routes/teacher');
const { loginResgiterRoutes } = require('./routes/loginRegister');
const mongoose = require('mongoose')

const { Student } = require('./model/Student');
const { Teacher } = require('./model/Teacher');

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL);

const PORT = process.env.PORT;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

// tokens validation and sending the id to the next level
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
})

app.use(loginResgiterRoutes);
app.use('/student', studentRoutes);
app.use('/teacher', teacherRoutes);

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}...`);
})