const express = require("express");
const {handleGetAllUsers,GetUserByID,UpdateUser,DeleteUser,CreateNewUser} = require('../controllers/user');
const router = express.Router(); // fr user
// router.get('/' , async (req,res) =>{
//   const allDBUsers = await User.find({});
//    const html = `
//   <ul>
// ${allDBUsers.map( (user) => `<li>${user.firstName} - ${user.email}</li>` ).join(' ')}
//   </ul>
//   `
//   ;
//   res.send(html);
// })


// router.get("/", handleGetAllUsers);
// // doing methods on '/' we do on users!

// router.post("/",CreateNewUser);
//since the above two have same routes we merge them : 
router.
route("/")
.get(handleGetAllUsers)
.post(CreateNewUser);


router
  .route("/:id")
  .get(GetUserByID)
  .patch(UpdateUser)
  .delete( DeleteUser);


module.exports = router;