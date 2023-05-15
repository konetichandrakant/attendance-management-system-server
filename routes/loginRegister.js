const express = require('express')
const router = express.Router();

router.post('/login', (req, res, next) => {
  const { userId, password, type } = req.body;

  if (type === 'teacher') {
    jsonwebtoken.sign("", "", { algorithm: 'HS256' })
  } else {
    jsonwebtoken.sign("", "", { algorithm: 'HS256' })
  }
})

router.post('/register', (req, res, next) => {
  const { userId, password, type } = req.body;
})

export default app;