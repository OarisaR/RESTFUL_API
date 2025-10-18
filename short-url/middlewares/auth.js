const {getUser} = require("../service/auth");

//authnetication!!
function checkAuthentication(req,res,next){
    const tokenCookie = req.cookies?.token;
    if(!tokenCookie) return next(); // if no auth value or no bearer then move on...  
    // SOFT ENFORCEMENT
    const token = tokenCookie;
    const user = getUser(token);

    req.user = user;
    next();
}

// authorization
function restrictTo(roles=[]){
    return function(req,res,next){
        //Blocks access if you don’t have permission.
        if(!req.user) return res.redirect("/login"); // no user so go to login!!
        if(!roles.includes(req.user.role)) return res.end("Unauthorised"); //no permission
        // if satisfied
        next(); // proceed next
   
    };

}
module.exports = {
   checkAuthentication,
   restrictTo,
}