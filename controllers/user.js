const User = require("../models/user");

// Controllers are the Functions which are to be attached to routes
async function handleGetAllUsers(req, res) {
  const allDBUsers = await User.find({});

  return res.json(allDBUsers);
}

async function GetUserByID(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  return res.json(user);
}

async function UpdateUser(req, res) {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }); // just hardcoded it
  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }
  return res
    .status(200)
    .json({ status: "successfully updated", user: updatedUser });
}


async function DeleteUser(req, res) {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "successfully deleted", user: deletedUser });
}

async function CreateNewUser(req,res){
    const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ message: "All fields are needed" });
  }
  const result = await User.create({
    firstName : body.first_name,
    lastName : body.last_name,
    email:body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });
  console.log(result);
  return res.status(201).json({status: "success" , id : result._id});
}
module.exports = { handleGetAllUsers, GetUserByID, UpdateUser, DeleteUser , CreateNewUser};
