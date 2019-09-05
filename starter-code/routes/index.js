const express = require('express');
const router  = express.Router();
const postModel = require("../models/post");
const cloudinary = require("../config/cloudinary.js");
const commentModel= require ("../models/comments");

/* GET home page. */
router.get('/', (req, res, next) => {
  postModel.find()
  .then(dbRes=> res.render('index', { title: 'Irontumblr' , post:dbRes}))
  .catch(dbErr => console.log((dbErr)));
});

router.get("/create", (req, res)=> {
    res.render("post/create");
});

router.post("/create", cloudinary.single("image"), (req, res)=> {
  
  var creatorId= req.session.passport.user;
  var picPath;
  var picName;
  const content= req.body.content;

  if (req.file) {
    picPath = req.file.url;
    picName= req.file.originalname;
  }

  const newPostModel= {content, creatorId, picPath, picName};

  postModel.create(newPostModel)
  .then(dbRes => {
  console.log(dbRes);
  res.redirect("/")})
  .catch(dbErr => console.log(dbErr))
});

router.get("/:id", (req, res)=> {
  postModel.findById(req.params.id)
  .then(dbRes => commentModel.find({postId : dbRes})
    .then(response =>{res.render("post/show", {post:dbRes , comments:response})})
    .catch(err => {console.log(err)}))
  .catch(dbErr => console.log(dbErr))
});

router.post("/:id", cloudinary.single("image"), (req, res)=> {
  postModel.findById(req.params.id)
  .then(dbRes => {
    var authorId= req.session.passport.user;
    var picPath;
    var picName;
    const content= req.body.content;
    var postId = dbRes;
  
    if (req.file) {
      picPath = req.file.url;
      picName= req.file.originalname;
    }
  
    const newCommentsModel= {content, authorId, picPath, picName, postId};
  
    commentModel.create(newCommentsModel)
    .then(response => res.redirect("/:id"))
    .catch(error => console.log(error))
  })
  .catch(dbErr => console.log(dbErr))
})

module.exports = router;
