const express = require('express');
const router = express.Router();
const URL = require('../models/url'); // adjust path to your model
const {restrictTo,checkAuthentication} = require('../middlewares/auth')



//admin shall see all urls
router.get('/admin/urls', restrictTo(['ADMIN']), async (req,res)=>{
const allUrls = await URL.find({}).populate({ path: "createdBy", select: "email" }) // foregin id concept!!
 //finding all urls
return res.render("home",{
  urls : allUrls,
 user: req.user,
});
})

//for home
router.get('/' , restrictTo(["NORMAL",, "ADMIN"]),async (req,res)=>{
    // we want to show user specific urls only
    

    const allurls = await URL.find({ createdBy : req.user._id}) ;
    return res.render("home",{
        urls : allurls,
    });
})
router.get('/signup' ,(req,res) => {
    return res.render("signup");
})
router.get('/login' ,(req,res) => {
    return res.render("login");
})

module.exports = router;