const express = require('express')
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');
const dotenv = require('dotenv');

const { Student } = require('../model/Student');
const { Teacher } = require('../model/Teacher');

dotenv.config();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

router.post('/login', (req, res, next) => {
  const { userId, password, type } = req.body;
  if (type === 'teacher') {
    const userData = Teacher.findById(userId);

    if (userData === null || userData['password'] !== password) {
      res.send({ valid: false });
    }
  } if (type === 'student') {
    const userData = Student.findById(userId);

    if (userData === null || userData['password'] !== password) {
      res.send({ valid: false });
    }
  }

  let token = jsonwebtoken.sign({ userId: userId, type: type }, ACCESS_TOKEN, { algorithm: 'HS256' })
  res.send({ token: token, valid: true });
})

router.post('/register', (req, res, next) => {
  const { userId, password, userName, type } = req.body;
  let token = jsonwebtoken.sign({ userId: userId, type: type }, ACCESS_TOKEN, { algorithm: 'HS256' })

  const user = new Student({ userId: userId, password: password, userName: userName })
  res.send({ token: token, valid: true });
})

module.exports = { loginResgiterRoutes: router }