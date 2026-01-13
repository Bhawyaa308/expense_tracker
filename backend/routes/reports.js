const express = require("express");
const db = require("../db");
const router = express.Router();

/* Overspending */
router.get("/overspending", (req, res) => {
  const sql = `
    SELECT u.name AS user_name,
           c.category_name,
           SUM(t.amount) AS total_spent,
           b.monthly_limit
    FROM transactions t
    JOIN users u ON t.user_id = u.user_id
    JOIN categories c ON t.category_id = c.category_id
    JOIN budgets b
      ON t.user_id = b.user_id AND t.category_id = b.category_id
    GROUP BY u.name, c.category_name, b.monthly_limit
    HAVING SUM(t.amount) > b.monthly_limit
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

/* Savings status */
router.get("/savings", (req, res) => {
  const sql = `
    SELECT u.name,
           s.month_year,
           s.target_amount,
           s.saved_amount,
           CASE
             WHEN s.saved_amount >= s.target_amount THEN 'Goal Achieved'
             WHEN s.saved_amount > 0 THEN 'Partial Savings'
             ELSE 'No Savings'
           END AS status
    FROM savings s
    JOIN users u ON s.user_id = u.user_id
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

module.exports = router;
