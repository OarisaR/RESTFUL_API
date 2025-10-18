const jwt = require("jsonwebtoken");
const secret = "oarisssa";

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secret
  ); //the payload is stamped with the secret key
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret); //to verify a user we take the token and the secret key
  } catch {
    return null;
  }
}
module.exports = { setUser, getUser };
