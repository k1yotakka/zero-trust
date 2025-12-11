const express = require("express");
const { authRequired } = require("../middleware/auth");
const { requireRole } = require("../middleware/rbac");

const router = express.Router();

router.get(
  "/dashboard",
  authRequired,
  requireRole("employee", "manager", "admin"),
  (req, res) => {
    res.json({
      message: "Welcome to SecureHub Dashboard",
    });
  }
);

module.exports = router;
