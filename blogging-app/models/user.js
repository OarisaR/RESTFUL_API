const { Schema , model} = require("mongoose");
const { createHmac , randomBytes} = require("crypto"); // builtin package no installtoon , hashes pass
const {createToken} = require('../service/auth')
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImgURL: {
      type: String,
      default: "/images/default.jpg",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);


//hashing the password!!
userSchema.pre('save' , function (next){
    const user = this; // current user
    if(!user.isModified("password")) return; //if passwords isn't changed then no need to hash again
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt).update(user.password).digest("hex");
    this.salt = salt;
    this.password = hashedPassword;
    next();


});

userSchema.static('matchPassAndCreateToken', async function(email,password){
    const user = await this.findOne({email});
    if(!user) throw new Error('User not found!')
    const salt = user.salt;
    const hashedPassword = user.password;
    const userProvidedHash =  createHmac('sha256', salt).update(password).digest("hex"); // hashing again
    // check if the new hashed one matches the stored hashed one

    if(hashedPassword !== userProvidedHash) throw new Error("Incorrect password");

    //return user object
    const token = createToken(user);
    return token;

})
const User = model('user', userSchema);

module.exports = User;
