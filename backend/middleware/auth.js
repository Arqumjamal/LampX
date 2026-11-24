const jwt = require("jsonwebtoken");
module.exports = function auth(req, res, next) {
  const token = req.cookies?.lampx_token;
  if (!token) return res.status(401).json({ message: "Please sign in." });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: "Session expired. Please sign in again." });
  }
};