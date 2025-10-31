const path = require("path");
const express = require('express');
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');
const Blog = require('./models/blog')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const {checkAuthCookie} = require('./middlewares/auth')
const app = express();
const PORT = 8000;



mongoose.connect(
  'mongodb+srv://oarisa_user:********@blogify.ydczb9b.mongodb.net/blogify?retryWrites=true&w=majority'
)
.then(() => console.log("MONGODB CONNECTED"));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
app.set('view engine','ejs');
app.set("views",path.resolve("./views"));

app.use(express.urlencoded({extended:false}));
app.use(express.static(path.resolve('./public'))) //important for image rendering!
app.use(cookieParser());
app.use(checkAuthCookie('token'));

app.get('/',async (req,res)=>{
  const allBlogs = await Blog.find({});
    res.render("home",{
      user : req.user,
      blogs:allBlogs,
    });
});

app.use('/user' , userRoute)

app.use('/blog' , blogRoute)
