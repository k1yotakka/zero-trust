const express = require("express");
const bcrypt = require("bcrypt");
const { users } = require("../data/users");
const { addAuditLog } = require("../data/auditLogs");
const { generateAccessToken } = require("../middleware/auth");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  const exists = users.find((u) => u.email === email);
  if (exists) return res.status(409).json({ message: "User exists" });

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = {
    id: users.length + 1,
    email,
    passwordHash,
    role: "employee",
  };

  users.push(newUser);

  res.status(201).json({ message: "User created" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = generateAccessToken(user);

  addAuditLog({ type: "login", email });

  res.json({
    accessToken: token,
    user: { email: user.email, role: user.role },
  });
});

module.exports = router;
