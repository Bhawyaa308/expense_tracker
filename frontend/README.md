# Smart Expense Tracker & Budget Management System

## Overview

This project is a **Smart Expense Tracker and Budget Management System** designed to analyze income, expenses, savings, and overspending patterns.

The system is primarily **SQL-driven**, focusing on strong database design and analytical querying.  
A lightweight **backend (Node.js + Express)** is used to manage data flow, and a **React (Vite)** frontend is included for future extensibility.

---

## Key Highlights

- Strong focus on **database design and SQL analytics**
- Clean separation of **frontend and backend**
- Demonstrates real-world financial use cases
- Suitable for **backend, database, and data-focused roles**

---

## Features

- Tracks income and expense transactions for multiple users
- Categorizes transactions into income and expense types
- Analyzes category-wise spending against defined budgets
- Identifies top spending categories per user
- Compares month-over-month spending trends
- Tracks savings goals and achievement status
- Generates alerts when category budgets are exceeded

---

## Database Design

The system is built using a **normalized relational schema** with the following tables:

- Users
- Categories
- Transactions
- Budgets
- Savings
- Alerts

The schema is designed to ensure data consistency and efficient analytical querying.

---

## Key SQL Concepts Used

- Inner joins across multiple tables
- Aggregate functions such as `SUM`
- `GROUP BY` and `HAVING` clauses
- Window functions (`ROW_NUMBER`, `LAG`)
- `CASE` expressions for conditional logic
- Views for reusable monthly summaries

---

## Project Structure

```text
expense_tracker/
├─ backend/
│  ├─ routes/
│  ├─ db.js
│  ├─ server.js
│  ├─ package.json
│  └─ package-lock.json
│
├─ frontend/
│  ├─ src/
│  ├─ public/
│  ├─ index.html
│  ├─ vite.config.js
│  ├─ eslint.config.js
│  ├─ package.json
│  └─ package-lock.json
│
├─ schema.sql
├─ data.sql
├─ queries.sql
└─ README.md
```
