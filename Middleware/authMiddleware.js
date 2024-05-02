const jwt = require("jsonwebtoken"); // signs and validates
const db = require("../db.js");

module.exports = (req, res, next) => {
  try {
    // 1) Extracting the token
    // Authorization: bearer aidaalehnfadalijadfadfafiahad
    const token = req.headers["Authorization"]
      ? req.headers["Authorization"].split(" ")[1]
      : "";

    // 2) next we verify if token was provided
    if (!token) {
      return res
        .status(403)
        .json({ success: false, message: "You are not authorized" });
    }

    // 3) Verifying the token provided is accurate compared to our signature (JWT_ACCESS_SECRET)
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET); // data hidden in the token
    const user = db.users.find((u) => u.id === payload.user.id);
    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: "You are not authorized" });
    }
    // 4) Assume the user is valid; everything went well if we get to this point
    req.user = user;
  } catch (error) {
    console.log(error)
    return res
        .status(403)
        .json({ success: false, message: "You are not authorized" });
  }
  return next()
};
