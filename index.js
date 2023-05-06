const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
app.use(express.json());

const MONGODB_URL = process.env.MONGODB_URL;
const ATTENDANCE_REQUEST_URL_PATH = process.env.ATTENDANCE_REQUEST_URL_PATH;
mongoose.connect(MONGODB_URL);

const PORT = process.env.PORT;

app.use(function (req, res, next) {
  console.log(req.body);
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}...`);
})