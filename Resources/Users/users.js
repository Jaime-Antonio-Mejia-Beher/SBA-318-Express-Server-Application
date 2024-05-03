const express = require("express");
const userRoutes = express.Router();
const db = require("../../db.js");
const jwt = require("jsonwebtoken");
const verifyAuth = require('../../Middleware/authMiddleware.js')
const User = require('../../models/user.js');

userRoutes
  .post("/register", async (req, res) => {
    // const user = req.user
    const { name, email, password } = req.body;
    // if email already exists send error
  //   if (db.users.find((user) => user.email === email)) {
  //     return res.json({ success: false, message: "Email already exist" });
  //   }
  //   const userData = { id: db.users.length + 1, name, email }
  //   db.users.push({...userData, password });
  //   return res.json({ success: true, data: userData });
  try {
    // Check if user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.json({ success: false, message: "Email already exists" });
    }

    // Create a new user instance
    const newUser = new User({ name, email, password });

    // Save the user to the database
    await newUser.save();

    return res.json({ success: true, message: "User registered successfully", data: newUser });
} catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ success: false, message: "Error registering user" });
}
  })
  .post("/login", async (req, res) => {
    const { email, password } = req.body;
    // const user = db.users.find(
    //   (user) => user.email === email && user.password === password
    // );
    // if (user) {
    //   const accessToken = jwt.sign({ user }, process.env.JWT_ACCESS_SECRET, {
    //     expiresIn: "30d",
    //   });
    //   return res.json({
    //     success: true,
    //     message: "Login successful",
    //     data: { accessToken },
    //   });
    // }
    // return res.json({ success: false, message: "Login fail" });
    try {
      // Find user by email and password
      const user = await User.findOne({ email, password });  // User comes from mongoose
      if (!user) {
          return res.json({ success: false, message: "Invalid email or password" });
      }

      // Generate JWT token
      const accessToken = jwt.sign({ user }, process.env.JWT_ACCESS_SECRET, { expiresIn: "30d" });

      return res.json({
          success: true,
          message: "Login successful",
          data: { accessToken }
      });
  } catch (error) {
      console.error("Error logging in user:", error);
      return res.status(500).json({ success: false, message: "Error logging in user" });
  }
  })
  .get("/", verifyAuth, (req, res) => {
    return res.json(db.users.find((u) => u.id === +req.params.id));
  });

module.exports = userRoutes;
