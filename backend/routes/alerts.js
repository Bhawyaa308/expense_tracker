const express = require("express");
const db = require("../db");
const router = express.Router();

// Get alerts
router.get("/", (req, res) => {
  const sql = `
    SELECT a.alert_id, u.name, a.message, a.created_at
    FROM alerts a
    JOIN users u ON a.user_id = u.user_id
    ORDER BY a.created_at DESC
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

module.exports = router;
