const express = require("express");
const userRoutes = express.Router();
const db = require("../../db.js");

userRoutes
  .post("/register", (req, res) => {
    // const user = req.user
    const { name, email, password } = req.body;
    // if email already exists send error
    if (db.users.find((user) => user.email === email)) {
      return res.json({ success: false, message: "Email already exist" });
    }
    db.users.push({ name, email, password });
    return res.json({ success: true });
  })
  .post("/login", (req, res) => {
    const { email, password } = req.body;
    if (
      db.users.find(
        (user) => user.email === email && user.password === password
      )
    ) {
      // To do: implement tokenize login with jwt
      return res.json({ success: true, message: "Login successful" });
    }
    return res.json({ success: false, message: "Login fail" });
  })
  .get("/", (req, res) => {
    return res.json(db.users);
  });

module.exports = userRoutes;
