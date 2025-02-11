import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import AddExpense from "./AddExpense";

const App = () => {
  return (
    <div>
      <header style={{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 20px",
  background: "#333",
  color: "white"
}}>
  <h2 style={{ margin: 0 }}>Expense Tracker</h2>
  <nav style={{marginRight:'150px'}}>
    <Link to="/" style={{ color: "white", marginRight: "15px", textDecoration: "none", fontSize:20}}>Home</Link>
    <Link to="/add" style={{ color: "white", textDecoration: "none", fontSize:20 }}>Add</Link>
  </nav>
</header>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddExpense />} />
      </Routes>
    </div>
  );
};

export default App;
