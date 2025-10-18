const User = require('../models/user')
const {setUser,getUser} = require('../service/auth');
async function handleSignUp(req,res){
    const {name, email , password} = req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/");
}
async function handleLogin(req,res){
    const {email, password} = req.body;
    const user = await User.findOne({email,password});
    if(!user) return res.render("login" , {
        error : "Invalid",
    })
    const token = setUser(user);
    //cookies refer to its own domain
    res.cookie("token" , token);
    return res.redirect("/");
}

module.exports = {
    handleSignUp,
    handleLogin

}