const express = require("express");
const { authRequired } = require("../middleware/auth");

const router = express.Router();

router.get("/me", authRequired, (req, res) => {
  res.json({
    id: req.user.sub,
    email: req.user.email,
    role: req.user.role,
  });
});

module.exports = router;
