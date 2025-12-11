require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const accountRoutes = require("./routes/account");
const protectedRoutes = require("./routes/protected");
const auditRoutes = require("./routes/audit");
const adminRoutes = require("./routes/admin");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: false,
  })
);

// Public
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// Protected
app.use("/api/account", accountRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/admin", auditRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Backend running at http://localhost:${process.env.PORT || 4000}`);
});
