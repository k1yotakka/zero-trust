const { addAuditLog } = require("../data/auditLogs");

function requireRole(...allowed) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ msg: "Unauthenticated" });

    if (!allowed.includes(req.user.role)) {
      addAuditLog({
        type: "forbidden",
        userId: req.user.sub,
        email: req.user.email,
        triedRole: req.user.role,
      });

      return res.status(403).json({
        message: "Forbidden: insufficient privileges",
      });
    }

    next();
  };
}

module.exports = { requireRole };
