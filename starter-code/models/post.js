const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const post = new Schema (
  {
    content:String,
    creatorId :{
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    image: {
      picPath : String,
      picName : String,
    }
  })

  const Post = mongoose.model("Post", post);

  module.exports = Post;