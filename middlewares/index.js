const fs = require("fs");

// the middlewares needs to be seperated into functions based on their work
function logReqRes(filename){
 return (req,res,next) =>{
    fs.appendFile(
    filename,
    `\n${Date.now()}: " ${req.method} : ${req.path}\n`,
    (err) => {
      next();
    }
  );
 }
}
module.exports = {logReqRes};