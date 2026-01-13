const express = require("express");
const db = require("../db");
const router = express.Router();

// Get all users
router.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

module.exports = router;
