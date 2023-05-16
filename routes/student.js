const express = require('express')
const router = express.Router();
const { Student } = require('../model/Student');
const { Teacher } = require('../model/Teacher');
const { Course } = require('../model/Course');

router.get('/', (req, res) => {

})

router.get('/:courseId', (req, res) => {
  
})

module.exports = { studentRoutes: router };