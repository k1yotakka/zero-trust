const jwt = require("jsonwebtoken");
const { addAuditLog } = require("../data/auditLogs");

const ACCESS_TOKEN_TTL_MINUTES = 15;

function generateAccessToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: `${ACCESS_TOKEN_TTL_MINUTES}m`,
    }
  );
}

function authRequired(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing token" });
  }

  const token = header.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ message: "Token expired or invalid" });
  }
}

module.exports = { authRequired, generateAccessToken };
