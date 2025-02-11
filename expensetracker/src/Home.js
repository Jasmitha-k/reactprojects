import React, { useContext, useMemo } from "react";
import { ExpenseContext } from "./ExpenseContext";

const Home = () => {
  const { state, dispatch } = useContext(ExpenseContext);

 
  const totalExpenses = useMemo(() => {
    return state.expenses
      .filter(exp => exp.type === "Expense")
      .reduce((sum, exp) => sum + exp.amount, 0);
  }, [state.expenses]);

  const totalEarnings = useMemo(() => {
    return state.expenses
      .filter(exp => exp.type === "Earning")
      .reduce((sum, exp) => sum + exp.amount, 0);
  }, [state.expenses]);

  const netBalance = totalEarnings - totalExpenses;

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>All Expenses</h2>
      <div style={{
        width: "50%",
        margin: "20px auto",
        padding: "15px",
        backgroundColor: "#f8f8f8",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
      }}>
        <p><strong>Total Expenses:</strong> <span style={{ color: "red" }}>{totalExpenses.toFixed(2)}</span></p>
        <p><strong>Total Earnings:</strong> <span style={{ color: "green" }}>{totalEarnings.toFixed(2)}</span></p>
        <h3 style={{ color: netBalance >= 0 ? "green" : "red" }}>
          Net Balance: {netBalance.toFixed(2)}
        </h3>
      </div>
      <table border="1" width="100%" style={{ marginTop: "20px", textAlign: "center" }}>
  <thead>
    <tr>
      <th>Title</th>
      <th>Amount</th>
      <th>Type</th>
      <th>Date</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {state.expenses.length > 0 ? (
      state.expenses.map((expense) => (
        <tr key={expense.id}>
          <td>{expense.title}</td>
          <td>${expense.amount}</td>
          <td style={{ color: expense.type === "Expense" ? "red" : "green" }}>
            {expense.type}
          </td>
          <td>{expense.date}</td>
          <td>
            <button onClick={() => dispatch({ type: "DELETE_EXPENSE", payload: expense.id })}>
              Delete
            </button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="5" style={{ padding: "10px", fontWeight: "bold", color: "gray" }}>
          No expenses added yet!
        </td>
      </tr>
    )}
  </tbody>
</table>

    </div>
  );
};

export default Home;
