CREATE Table users (
  user_id INT AUTO_INCREMENT primary KEY,
  name varchar(100) NOT NULL,
  email varchar(100) unique NOT NULL,
  created_at timestamp default current_timestamp
);

CREATE Table categories (
  category_id INT AUTO_INCREMENT primary KEY,
  category_name varchar(100) NOT NULL,
  type varchar(100) NOT NULL
);

CREATE Table transactions (
  transaction_id INT AUTO_INCREMENT primary KEY,
   user_id INT NOT NULL,
  category_id INT NOT NULL,
  amount decimal(10,2),
  transaction_date date,
  description varchar(100),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

CREATE Table budgets (
  budget_id INT AUTO_INCREMENT primary KEY,
   user_id INT NOT NULL,
  category_id INT NOT NULL,
  monthly_limit decimal(10,2),
   FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

CREATE Table savings (
  savings_id INT AUTO_INCREMENT primary KEY,
   user_id INT NOT NULL,
  month_year date,
  target_amount decimal(10,2),
  saved_amount decimal(10,2),
   FOREIGN KEY (user_id) REFERENCES users(user_id)
);

 CREATE Table alerts (
  alert_id INT AUTO_INCREMENT primary KEY,
  user_id INT NOT NULL,
  message varchar(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);
