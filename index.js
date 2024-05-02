const express = require("express");
const app = express();
const PORT = 3400;
const router = express.Router();
const userRoutes = require("./Resources/Users/users.js");
const postsRoutes = require("./Resources/Posts/posts.js");
const commentRoutes = require("./Resources/Comments/comments.js");
const db = require("./db.js");
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("MongoDB connected");
  }).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.set("view engine", "ejs")  // we installed npm i ejs

app.use(express.json()); // middleware that defines to always parse as json

app.use(express.urlencoded())  //  parses incoming requests with urlencoded payloads

// the end point where the user sees the form to register
app.get('/views/register', (req, res, next) => {
    res.render("register", {   // rendering out a file
        userName: "Nathan"
    })
})
// submit button takes the user to this post
// app.post('/validateRegister', (req, res, next) => {  
//     console.log(req.body)
//     res.send()
// })

app.get('/views/login', (req, res, next) => {
    res.render("login")     // rendering out a file login.ejs
})

app.use("/api/users", userRoutes);

app.use("/api/posts", postsRoutes);

app.use("/api/comments", commentRoutes);

app.listen(PORT, () => {
  console.log("listening");
});
