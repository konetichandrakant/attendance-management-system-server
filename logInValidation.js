const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const isLoggedIn = (req, res, next) => {
  try {
    const user = jwt.verify(req.cookies.token, process.env.ACCESS_TOKEN);
    req['userId'] = user['userId'];
    next();
  } catch (err) {
    req.cookies.clear('token');
    return res.send({ loggedIn: false });
  }
}

module.exports = { isLoggedIn };