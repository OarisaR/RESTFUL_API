const JWT = require('jsonwebtoken')
const secret = "$fly123"

//to create a token
function createToken(user){
    const payload = {
        _id : user._id,
        email: user.email,
        fullName: user.fullName,
        profileImgURL: user.profileImgURL,
        role : user.role,
    }
    const token = JWT.sign(payload,secret)
    return token;
}

//to validate the token
function validateToken(token){

  const payload = JWT.verify(token,secret);
  return payload;
}

module.exports = {createToken , validateToken};

