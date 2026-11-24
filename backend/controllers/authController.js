const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

function setToken(res, userId) {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "2h" });
  res.cookie("lampx_token", token, {
    httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production",
    maxAge: 2 * 60 * 60 * 1000
  });
}
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Name, email and password are required." });
    if (String(password).length < 8) return res.status(400).json({ message: "Password must be at least 8 characters." });
    const normalizedEmail = String(email).trim().toLowerCase();
    if (await User.findOne({ email: normalizedEmail })) return res.status(409).json({ message: "An account with this email already exists." });
    const hash = await bcrypt.hash(password, 12);
    const user = await User.create({ name: String(name).trim(), email: normalizedEmail, password: hash });
    setToken(res, user.id);
    res.status(201).json({ message: "Account created.", user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) { res.status(500).json({ message: "Could not create account." }); }
};
exports.login = async (req, res) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(String(req.body.password || ""), user.password))) return res.status(401).json({ message: "Email or password is incorrect." });
    setToken(res, user.id);
    res.json({ message: "Signed in.", user: { id: user.id, name: user.name, email: user.email } });
  } catch { res.status(500).json({ message: "Could not sign in." }); }
};
exports.me = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found." });
  res.json({ user: { id: user.id, name: user.name, email: user.email } });
};
exports.logout = (_req, res) => {
  res.clearCookie("lampx_token", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" });
  res.json({ message: "Signed out." });
};