const mongoose = require("mongoose");
// const url = "mongodb://localhost/diarydb";

const onlineURI =
  "mongodb+srv://joseph4231:Barca4231@cluster0.zrkxc.mongodb.net/blogDb?retryWrites=true&w=majority";

mongoose
  .connect(onlineURI)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
