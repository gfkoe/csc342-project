const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const API_SECRET = process.env.API_SECRET;

// Generate JWT
function generateToken(user) {
  const payload = {
    user: user,
    iat: Date.now(),
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  };

  return jwt.sign(payload, JWT_SECRET);
}

// Verify JWT
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    throw new Error("Invalid token");
  }
}

// Middleware to authenticate request
exports.authenticateToken = (req, res, next) => {
  // Get auth header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  // Split into type and token
  const [type, token] = authHeader.split(" ");

  // Validate token
  try {
    const decoded = verifyToken(token);

    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// Generate new token
exports.generateNewToken = (user) => {
  return generateToken(user);
};
