// middleware/validateTokenHandler.js
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization header is missing or invalid" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Assuming your JWT payload has a 'user' property containing user info

    // Optionally, you can perform additional checks or actions based on the decoded token
    // Example: Check if the token is expired
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTimestamp) {
      return res.status(401).json({ message: "Token has expired" });
    }

    // Call next() to pass control to the next middleware
    next();
  } catch (err) {
    console.error(err);
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }
    return res.status(401).json({ message: "User is not authorized" });
  }
});

module.exports = validateToken;
