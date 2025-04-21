const express = require("express");
const router = express.Router();

let logs = []; // тимчасово в пам'яті. Для продакшну — MongoDB / PostgreSQL

router.post("/api/user-logs", (req, res) => {
  const { action, timestamp } = req.body;
  logs.push({ action, timestamp });
  res.json({ success: true });
});

router.get("/api/user-logs", (req, res) => {
  res.json({ logs });
});

module.exports = router;
