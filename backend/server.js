// server.js
const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/users");
const transactionRoutes = require("./routes/transactions");
const reportRoutes = require("./routes/reports");
const alertRoutes = require("./routes/alerts");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/transactions", transactionRoutes);
app.use("/reports", reportRoutes);
app.use("/alerts", alertRoutes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
