const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const isLoggedIn = (req, res, next) => {
  console.log(req.headers);
  try {
    const user = jwt.verify(req.headers.authorization, process.env.ACCESS_TOKEN);
    console.log(user);
    req['userId']=user['userId'];
    req['userType']=user['type'];
    next();
  } catch (err) {
    return res.send(false);
  }
}

module.exports = { isLoggedIn };