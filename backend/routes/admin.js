const express = require("express");
const router = express.Router();

const { users } = require("../data/users");
const { authRequired } = require("../middleware/auth");
const { requireRole } = require("../middleware/rbac");

router.get(
  "/users",
  authRequired,
  requireRole("manager", "admin"),
  (req, res) => {
    res.json(users);
  }
);

router.patch(
  "/users/:id",
  authRequired,
  requireRole("admin"),
  (req, res) => {
    const id = Number(req.params.id);
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }

    const user = users.find((u) => u.id === id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = role;

    return res.json({
      message: "User updated",
      user,
    });
  }
);

module.exports = router;
