// generic middleware to check every function
const {validateToken} = require('../service/auth')
function checkAuthCookie(cookieName) {
  return (req, res, next) => {
    const token = req.cookies[cookieName];
    if (!token) return next();
    try {
      const userPayload = validateToken(token);
      req.user = userPayload;
    } catch (err) {}
    return next();
  };
}
module.exports = {checkAuthCookie};