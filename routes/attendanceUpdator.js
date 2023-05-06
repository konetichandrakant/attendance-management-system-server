const express = require('express');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

const URL_UPDATOR_SECRET_PATH = process.env.ATTENDANCE_REQUEST_URL_PATH;

app.post(`/attendance/${URL_UPDATOR_SECRET_PATH}`, (req, res) => {

})