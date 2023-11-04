const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const userModel = new Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  avatar: {
    type: String,
  },
  avatarID: {
    type: String,
  },
  blog:[
    {
        type:mongoose.Types.ObjectId,
        ref:"blogs",
    }
  ]
},{timestamps:true});

module.exports = mongoose.model("users",userModel)