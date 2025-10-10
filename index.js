// my learning in comments
const express = require("express");
const {connectDB} = require("./connection");

const {logReqRes} = require('./middlewares') ; // no need to say / index js it knows auto


//user route saying / means user
const userRouter = require('./routes/user')

const app = express();
const PORT = 8000;

//Connection
connectDB("mongodb+srv://oarisa_user:7LLZM913GAKI1iJ6@userprofiles.ydczb9b.mongodb.net/?retryWrites=true&w=majority&appName=userProfiles")

// Middlewares
app.use(express.urlencoded({ extended: false })); // like plugin,this adds form data into body
app.use(logReqRes("log.txt"));

//Routes
app.use("/api/users" , userRouter);

app.listen(PORT, () => console.log(`Server is running at  ${PORT}`));


// this takes the new data creates a JSON object and puts it in req.body

// Routes
// --- We shall follow task.txt instructions ---

// -- Basic structure --> app.get(path, callback)

// //--This renders a HTML document---
// app.get('/users' , async (req,res) =>{
//   const allDBUsers = await User.find({});
//    const html = `
//   <ul>
// ${allDBUsers.map( (user) => `<li>${user.firstName} - ${user.email}</li>` ).join(' ')}
//   </ul>
//   `
//   ;
//   res.send(html);
// })

// // REST APIs
// //--Client receives raw JSON DATA---
// // Good for any type of device as the frontend handles how to display the raw data
// app.get("/api/users",async (req, res) => {
//    const allDBUsers = await User.find({});
//   //creating a custom Header! - appends a X, this X indiciates it is not a built in rather a custom header
//   //res.setHeader("X-MyName", "Oarisa");

//   return res.json(allDBUsers);
// });

// // this :id can be anything like i can write : userid too!
// // app.get("/api/users/:id", (req,res)=>{
// //  const id = Number(req.params.id); // as id is string
// //  const user = users.find( (user) => user.id == id);
// //  return res.json(user);
// // });

// // -- POST MEANS TO CREATE SOMETHING NEW ---
// // app.post("/api/users", (req, res) => {
// //   const body = req.body;
// //   // users.push({
// //   //   first_name : body.first_name,
// //   //   last_name : body.last_name,
// //   //   gender : body.gender,
// //   // })
// //   if (
// //     !body ||
// //     !body.first_name ||
// //     !body.email ||
// //     !body.gender ||
// //     !body.job_title
// //   ) {
// //     return res.status(400).json({ message: "All fields are needed" });
// //   }
// //   users.push({ ...body, id: users.length + 1 });
// //   // fs.writeFile mainly writes the data into the file.
// //   fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
// //     return res.status(201).json({ status: "success", id: users.length });
// //   });
// // });

// //------FOR MONGODB-----
// app.post("/api/users",async (req, res) => {
//   const body = req.body;
//   if (
//     !body ||
//     !body.first_name ||
//     !body.last_name ||
//     !body.email ||
//     !body.gender ||
//     !body.job_title
//   ) {
//     return res.status(400).json({ message: "All fields are needed" });
//   }
//   const result = await User.create({
//     firstName : body.first_name,
//     lastName : body.last_name,
//     email:body.email,
//     gender: body.gender,
//     jobTitle: body.job_title,
//   });
//   console.log(result);
//   return res.status(201).json({status: "success" });
// });






// // // PATCH IS TO EDIT!
// // app.patch("/api/users/:id" , (req,res)=>{
// //     // edit
// // })

// // app.delete("/api/users/:id" , (req,res)=>{
// //     // delete
// // })

// // OBSERVE CAREFULLY patch delete and get specific user has SAME ROUTES SO MERGE IT
// app
//   .route("/api/users/:id")
//   .get(async (req, res) => {
//     //const id = Number(req.params.id); // as id is string [commented this line as in DB the id is automatically assigned]
//     //const user = users.find((user) => user.id == id);
    
    
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     return res.json(user);
//   })
//   .patch(async (req, res) => {
//     // edits a user
//     // const id = Number(req.params.id);
//     // const body = req.body;
//     // const idx = users.findIndex((user) => user.id == id); // this idx is the actual index of user in users array
//     // we will update the user at index idx with new data in body
//     // users[idx] = body; // this will replace the entire user with new data
//     // but we want to update only the fields which are sent in body
//     // so we will loop over the keys of body and update only those fields
    
//     const updatedUser = await User.findByIdAndUpdate(req.params.id , req.body , {new:true,runValidators:true}) ;// just hardcoded it
//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     return res.status(200).json({status:"successfully updated" , user : updatedUser})
    
  

//     // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
//     //   return res.json({ status: "success", id: id }); // succesfully edited user of given id!
//     // });
//   })
//   .delete( async (req, res) => {
//     // const id = Number(req.params.id);
//     // const newUsers = users.filter((user) => user.id != id); // filter basically returns a new list instead of modifying original user
//     // fs.writeFile("./MOCK_DATA.json", JSON.stringify(newUsers), (err, data) => {
//     //   return res.json({ status: "success" });
//     // });

//    const deletedUser = await User.findByIdAndDelete(req.params.id)
//    return res.json({status:"successfully deleted" , user : deletedUser});




//   });

// // We use backticks to embed any variables or expressions inside a string

