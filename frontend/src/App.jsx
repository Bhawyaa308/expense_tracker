import { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("Dashboard");

  // 🔹 common fetch function
  const fetchData = async (url, heading) => {
    try {
      const res = await fetch(url);
      const result = await res.json();
      setData(result);
      setTitle(heading);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // 🔹 reload transactions after insert
  const loadTransactions = () => {
    fetchData("http://localhost:8080/transactions", "Transactions");
  };

  // 🔹 add transaction
  const addTransaction = () => {
    fetch("http://localhost:8080/transactions/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: window.user_id,
        category_id: window.category_id,
        amount: window.amount,
        transaction_date: window.transaction_date,
        description: window.description,
      }),
    }).then(() => {
      alert("Transaction Added");
      loadTransactions(); // 🔥 refresh table
    });
  };

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Expense</h2>

        <button
          onClick={() => fetchData("http://localhost:8080/users", "Users")}
        >
          Users
        </button>

        <button
          onClick={() =>
            fetchData("http://localhost:8080/transactions", "Transactions")
          }
        >
          Transactions
        </button>

        <button
          onClick={() =>
            fetchData(
              "http://localhost:8080/reports/overspending",
              "Overspending Report"
            )
          }
        >
          Overspending
        </button>

        <button
          onClick={() => fetchData("http://localhost:8080/alerts", "Alerts")}
        >
          Alerts
        </button>
      </aside>

      {/* Main */}
      <main className="main">
        <h1>{title}</h1>

        {/* Add Transaction */}
        <h2>Add Transaction</h2>
        <div className="form">
          <input
            type="number"
            placeholder="User ID"
            onChange={(e) => (window.user_id = e.target.value)}
          />
          <input
            type="number"
            placeholder="Category ID"
            onChange={(e) => (window.category_id = e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            onChange={(e) => (window.amount = e.target.value)}
          />
          <input
            type="date"
            onChange={(e) => (window.transaction_date = e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            onChange={(e) => (window.description = e.target.value)}
          />

          <button onClick={addTransaction}>Add Transaction</button>
        </div>

        {/* Cards */}
        <div className="cards">
          <div className="card">
            <h3>Total Records</h3>
            <p>{data.length}</p>
          </div>
          <div className="card">
            <h3>Project Type</h3>
            <p>SQL Dashboard</p>
          </div>
          <div className="card">
            <h3>Status</h3>
            <p>Live Database</p>
          </div>
        </div>

        {/* Table */}
        <div className="table-box">
          {data.length > 0 ? (
            <table>
              <thead>
                <tr>
                  {Object.keys(data[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((val, j) => (
                      <td key={j}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="empty">Select an option from the sidebar</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
