const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const isLoggedIn = (req, res, next) => {
  try {
    const user = jwt.verify(req.cookies.token, process.env.ACCESS_TOKEN);
    req['userId'] = user['userId'];
    next();
  } catch (err) {
    console.log('not present');
    return res.send(false);
  }
}

module.exports = { isLoggedIn };