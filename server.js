const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./utils/db");
const user = require("./router/userRouter");
const blog = require("./router/blogRouter");
const comment = require("./router/commentRouter");
const PORT = process.env.PORT || 2004;
const app = express();
app.use(express.json());
db;
app.use(cors());
app.use("/api/user", user);
app.use("/api/blog", blog);
app.use("/api/comment", comment);
app.get("/", (req, res) => {
  res.status(200).json({ message: "welcome to my blog api" });
});
app.listen(PORT, () => {
  console.log(`server is now listening on port ${PORT}`);
});
