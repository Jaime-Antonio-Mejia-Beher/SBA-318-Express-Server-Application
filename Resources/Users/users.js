const express = require("express");
const userRoutes = express.Router();
const db = require("../../db.js");
const jwt = require("jsonwebtoken");
const verifyAuth = require('../../Middleware/authMiddleware.js')

userRoutes
  .post("/register", (req, res) => {
    // const user = req.user
    const { name, email, password } = req.body;
    // if email already exists send error
    if (db.users.find((user) => user.email === email)) {
      return res.json({ success: false, message: "Email already exist" });
    }
    const userData = { id: db.users.length + 1, name, email }
    db.users.push({...userData, password });
    return res.json({ success: true, data: userData });
  })
  .post("/login", (req, res) => {
    const { email, password } = req.body;
    const user = db.users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      const accessToken = jwt.sign({ user }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "30d",
      });
      return res.json({
        success: true,
        message: "Login successful",
        data: { accessToken },
      });
    }
    return res.json({ success: false, message: "Login fail" });
  })
  .get("/", verifyAuth, (req, res) => {
    return res.json(db.users.find((u) => u.id === +req.params.id));
  });

module.exports = userRoutes;
