const express = require("express");
const router = express.Router();
const multer = require('multer')


const Blog = require("../models/blog");
const Comment = require("../models/comment");
const path = require('path')


const storage = multer.diskStorage({
destination: function(req,file,cb){
  cb(null,path.resolve(`./public/uploads/`));
},
filename: function(req,file,cb){
  const fileName = `${Date.now()}-${file.originalname}`;
  cb(null,fileName);
},
});

const upload = multer({storage: storage});



router.get("/add",  (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});


router.get("/:id" , async (req,res)=>{
  const blog = await Blog.findById(req.params.id).populate('createdBy');
  const comments = await Comment.find({blogId : req.params.id}).populate('createdBy');
  // if we want to show the user who created the blog we need to populate when fethcing blog
  //console.log(blog.createdBy.profileImgURL);
  return res.render("blog",{
    user : req.user,
    blog,
    comments,
  });
})

router.post("/",upload.single('coverImg'),async (req,res)=>{
  const {title,body} = req.body;  
  const blog = await Blog.create({
      body,
      title,
      createdBy:req.user._id,
      coverImgURL:`uploads/${req.file.filename}`
    });
    return res.redirect(`/blog/${blog._id}`)
})


// COMMENT ROUTES --------------------------------------
router.post("/comment/:blogId", async (req,res)=>{
  await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,

  })
  return res.redirect(`/blog/${req.params.blogId}`)
})


module.exports = router;