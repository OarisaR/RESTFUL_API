const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/signin", (req, res) => {
  return res.render("signin");
});
router.get("/signup", (req, res) => {
  return res.render("signup");
});

//creating a new user --> signup!
router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/");
});
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    // collect the salt and a dd to the password to see if it matches
    const token = await User.matchPassAndCreateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (err) {
    return res.render("signin", {
      error: "Incorrect email or password",
    });
  }
});

router.get('/logout',(req,res)=>{
    res.clearCookie('token').redirect("signin");
})
module.exports = router;
