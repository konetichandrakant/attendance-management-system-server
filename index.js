const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jsonwebtoken = require('jsonwebtoken');
const studentRoutes = require('./routes/student');
const teacherRoutes = require('./routes/teacher');
const loginResgiterRoutes = require('./routes/loginRegister');

dotenv.config();
app.use(express.json());
app.use(loginResgiterRoutes);
app.use('/student', studentRoutes);
app.use('/teacher', teacherRoutes);

const MONGODB_URL = process.env.MONGODB_URL;
const ATTENDANCE_REQUEST_URL_PATH = process.env.ATTENDANCE_REQUEST_URL_PATH;
mongoose.connect(MONGODB_URL);

const PORT = process.env.PORT;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

app.use(function (req, res, next) {
  jsonwebtoken.verify(req.headers.authorization['token'], ACCESS_TOKEN, { algorithm: 'HS256' })
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.get('/error', (req, res) => {
  
})

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}...`);
})