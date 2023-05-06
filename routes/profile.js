const express = require('express');
const { isLoggedIn } = require('../logInValidation');
const app = express();

app.get('/profile', isLoggedIn, (req, res) => {
  const { user_id } = req.query;

  if (req.isTeacher) {
    return res.status().send();
  }

  return res.send();

})