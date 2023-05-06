const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const isLoggedIn = (req, res, next) => {
  const token = req.cookies.token;

  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.user = user;
    next();
  } catch (err) {
    req.cookies.clear('token');
    return res.send({ isValid: false });
  }
}

module.exports = { isLoggedIn };