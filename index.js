const express = require("express");
const app = express();
const PORT = 3400;
// const router = express.Router();
const userRoutes = require("./Resources/Users/users.js");
const postsRoutes = require("./Resources/Posts/posts.js");
const commentRoutes = require("./Resources/Comments/comments.js");
const db = require("./db.js");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path"); // Import the path module

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.set("view engine", "ejs"); // we installed npm i ejs

// express.static built-in middleware to serve static files (img, css, js); path.join(__dirname) helps ensure 
// the current scripts directory path (even if folder/file is moved)
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json()); // middleware that defines to always parse as json
// when is this actually applied??
app.use(express.urlencoded({ extended: true })); //  parses incoming requests with urlencoded payloads

// the end point where the user sees the form to register
app.get("/views/register", (req, res, next) => {
  res.render("register", {
    // rendering out a file
    userName: "Nathan",
  });
});

app.get("/views/login", (req, res, next) => {
  res.render("login"); // rendering out a file login.ejs
});

app.use("/api/users", userRoutes);

app.use("/api/posts", postsRoutes);

app.use("/api/comments", commentRoutes);

app.listen(PORT, () => {
  console.log("listening");
});
