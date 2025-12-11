const express = require("express");
const { authRequired } = require("../middleware/auth");
const { requireRole } = require("../middleware/rbac");
const { auditLogs } = require("../data/auditLogs");

const router = express.Router();

router.get(
  "/auditLogs",
  authRequired,
  requireRole("admin"),
  (req, res) => {
    res.json(auditLogs);
  }
);

module.exports = router;
