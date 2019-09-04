const express = require('express');
const router  = express.Router();
const postModel = require("../models/post");
const cloudinary = require("../config/cloudinary");

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Irontumblr' });
});

router.get("/create", (req, res)=> {
    res.render("post/create");
});

router.post("/create", cloudinary.single("image"), (req, res)=> {
  const newPost ={
    content: req.body,
    creatorId : {
      ref: req.session.currentUser}
  };
  if(req.file) newPost.image.picPath = req.file.secure_url;
postModel.create(newPost)
.then(dbRes => res.redirect("/"))
.catch(dbErr => console.log(dbErr))
})

module.exports = router;
