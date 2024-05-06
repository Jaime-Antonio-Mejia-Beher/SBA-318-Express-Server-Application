
const id = req.params.id;
const token = req.headers.authorization;
  
    if (!token) {
      return res
        .status(401)
        .json({
          success: false,
          message: "Unauthorized. Please provide a valid token.",
        });
    }
  
    const parts = token.split(" ");
    if (parts.length !== 2) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token format." });
    }
  
    const [scheme, credentials] = parts;
    if (!/^Bearer$/i.test(scheme)) {
      // verifying its a type: Bearer
      return res
        .status(401)
        .json({ success: false, message: "Invalid token scheme." });
    }
  
    const decodedToken = jwt.verify(credentials, process.env.JWT_ACCESS_SECRET);
    let userId;