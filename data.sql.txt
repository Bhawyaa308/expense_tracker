/* =========================================
   USERS DATA
   ========================================= */

INSERT INTO users (name, email)
VALUES
('Aarav Sharma', 'aarav@gmail.com'),
('Neha Verma', 'neha@gmail.com');


/* =========================================
   CATEGORIES DATA
   ========================================= */

INSERT INTO categories (category_name, type)
VALUES
('Salary', 'Income'),
('Freelance', 'Income'),
('Food', 'Expense'),
('Travel', 'Expense'),
('Rent', 'Expense'),
('Entertainment', 'Expense');


/* =========================================
   TRANSACTIONS DATA
   ========================================= */

INSERT INTO transactions
(user_id, category_id, amount, transaction_date, description)
VALUES
-- Aarav (user_id = 1)
(1, 1, 40000.00, '2025-01-01', 'January Salary'),
(1, 2, 8000.00,  '2025-01-10', 'Freelance Project'),
(1, 3, 1200.00,  '2025-01-05', 'Lunch'),
(1, 3, 1500.00,  '2025-01-15', 'Groceries'),
(1, 4, 900.00,   '2025-01-18', 'Cab'),
(1, 5, 12000.00, '2025-01-03', 'House Rent'),
(1, 6, 2500.00,  '2025-01-20', 'Movie & snacks'),

-- Neha (user_id = 2)
(2, 2, 15000.00, '2025-01-02', 'Internship Stipend'),
(2, 3, 800.00,   '2025-01-06', 'Mess food'),
(2, 3, 900.00,   '2025-01-16', 'Outside food'),
(2, 4, 600.00,   '2025-01-19', 'Bus pass'),
(2, 6, 1200.00,  '2025-01-22', 'Concert');


/* =========================================
   BUDGETS DATA
   ========================================= */

INSERT INTO budgets
(user_id, category_id, monthly_limit)
VALUES
-- Aarav
(1, 3, 2500.00),
(1, 4, 1500.00),
(1, 6, 2000.00),

-- Neha
(2, 3, 2000.00),
(2, 6, 1000.00);


/* =========================================
   SAVINGS DATA
   ========================================= */

INSERT INTO savings
(user_id, month_year, target_amount, saved_amount)
VALUES
(1, '2025-01-01', 10000.00, 9000.00),
(2, '2025-01-01', 5000.00,  3500.00);
