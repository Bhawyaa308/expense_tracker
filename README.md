Smart Expense Tracker & Budget Management System
Overview

This project is a SQL-based expense tracking and budget management system designed to analyze income, expenses, savings, and overspending patterns. It focuses on database design and analytical querying without using any frontend.

Features

Tracks income and expense transactions for multiple users

Categorizes transactions into income and expense types

Analyzes category-wise spending against defined budgets

Identifies top spending categories per user

Compares month-over-month spending trends

Tracks savings goals and achievement status

Generates alerts when category budgets are exceeded

Database Design

The system is built using a normalized relational schema with the following tables:

Users

Categories

Transactions

Budgets

Savings

Alerts

Key SQL Concepts Used

Joins (inner joins across multiple tables)

Aggregate functions (SUM)

GROUP BY and HAVING clauses

Window functions (ROW_NUMBER, LAG)

CASE expressions for conditional logic

Views for reusable monthly summaries

Files Structure

schema.sql – Table definitions and database structure

data.sql – Sample data insertion

queries.sql – Analytical queries and alert logic

README.md – Project documentation

Tools Used

MySQL (queries executed using OneCompiler)

Use Case

This project demonstrates how SQL can be used to derive meaningful financial insights such as overspending detection, spending trends, and savings analysis, making it suitable for backend or data-focused roles.
