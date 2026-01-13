const express = require("express");
const db = require("../db");
const router = express.Router();

/* GET all transactions */
router.get("/", (req, res) => {
  const sql = `
    SELECT t.transaction_id, u.name, c.category_name,
           t.amount, t.transaction_date, t.description
    FROM transactions t
    JOIN users u ON t.user_id = u.user_id
    JOIN categories c ON t.category_id = c.category_id
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

/* ADD transaction */
router.post("/add", (req, res) => {
  const { user_id, category_id, amount, transaction_date, description } =
    req.body;

  const sql = `
    INSERT INTO transactions
    (user_id, category_id, amount, transaction_date, description)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [user_id, category_id, amount, transaction_date, description],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Transaction added" });
    }
  );
});

module.exports = router;
