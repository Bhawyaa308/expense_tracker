/* =========================================
   BASIC VERIFICATION QUERIES
   ========================================= */

-- View all users
SELECT * FROM users;

-- View all categories
SELECT * FROM categories;

-- View all transactions
SELECT * FROM transactions;


/* =========================================
   CATEGORY-WISE SPENDING VS BUDGET
   (Overspending Detection)
   ========================================= */

SELECT
  u.name AS user_name,
  c.category_name,
  SUM(t.amount) AS total_spent,
  b.monthly_limit
FROM transactions t
JOIN users u
  ON t.user_id = u.user_id
JOIN categories c
  ON t.category_id = c.category_id
JOIN budgets b
  ON t.user_id = b.user_id
 AND t.category_id = b.category_id
GROUP BY
  u.name,
  c.category_name,
  b.monthly_limit
HAVING
  SUM(t.amount) > b.monthly_limit;


/* =========================================
   TOP 3 EXPENSE CATEGORIES PER USER
   ========================================= */

SELECT
  user_name,
  category_name,
  total_spent
FROM (
  SELECT
    u.name AS user_name,
    c.category_name,
    SUM(t.amount) AS total_spent,
    ROW_NUMBER() OVER (
      PARTITION BY u.user_id
      ORDER BY SUM(t.amount) DESC
    ) AS rn
  FROM transactions t
  JOIN users u
    ON t.user_id = u.user_id
  JOIN categories c
    ON t.category_id = c.category_id
  WHERE c.type = 'Expense'
  GROUP BY
    u.user_id,
    u.name,
    c.category_name
) ranked
WHERE rn <= 3;


/* =========================================
   MONTH-OVER-MONTH SPENDING TREND
   ========================================= */

SELECT
  user_id,
  year,
  month,
  monthly_spent,
  previous_month_spent,
  CASE
    WHEN previous_month_spent IS NULL THEN 'No previous data'
    WHEN monthly_spent > previous_month_spent THEN 'Increased'
    WHEN monthly_spent < previous_month_spent THEN 'Decreased'
    ELSE 'No change'
  END AS spending_trend
FROM (
  SELECT
    user_id,
    year,
    month,
    monthly_spent,
    LAG(monthly_spent) OVER (
      PARTITION BY user_id
      ORDER BY year, month
    ) AS previous_month_spent
  FROM (
    SELECT
      user_id,
      YEAR(transaction_date) AS year,
      MONTH(transaction_date) AS month,
      SUM(amount) AS monthly_spent
    FROM transactions
    GROUP BY
      user_id,
      YEAR(transaction_date),
      MONTH(transaction_date)
  ) monthly_summary
) trend_analysis;


/* =========================================
   SAVINGS GOAL ACHIEVEMENT STATUS
   ========================================= */

SELECT
  user_id,
  month_year,
  target_amount,
  saved_amount,
  CASE
    WHEN saved_amount >= target_amount THEN 'Goal Achieved'
    WHEN saved_amount > 0 THEN 'Partial Savings'
    ELSE 'No Savings'
  END AS savings_status
FROM savings;


/* =========================================
   ALERT GENERATION (INSERT LOGIC)
   ========================================= */

INSERT INTO alerts (user_id, message)
SELECT
  u.user_id,
  CONCAT(
    'Budget exceeded for ',
    c.category_name,
    '. Spent: ',
    SUM(t.amount),
    ', Limit: ',
    b.monthly_limit
  ) AS message
FROM transactions t
JOIN budgets b
  ON t.user_id = b.user_id
 AND t.category_id = b.category_id
JOIN users u
  ON t.user_id = u.user_id
JOIN categories c
  ON t.category_id = c.category_id
GROUP BY
  u.user_id,
  c.category_name,
  b.monthly_limit
HAVING
  SUM(t.amount) > b.monthly_limit;


/* =========================================
   VIEW GENERATED ALERTS
   ========================================= */

SELECT
  a.alert_id,
  u.name AS user_name,
  a.message,
  a.created_at
FROM alerts a
JOIN users u
  ON a.user_id = u.user_id
ORDER BY a.created_at DESC;
