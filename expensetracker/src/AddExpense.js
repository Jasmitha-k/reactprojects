import React, { useState, useContext, useRef } from "react";
import { ExpenseContext } from "./ExpenseContext";
import { useNavigate } from "react-router-dom";

const AddExpense = () => {
  const { dispatch } = useContext(ExpenseContext);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Expense"); // Default to Expense
  const[error , setError]=useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if(!title ||!amount){
      setError("please fill all the details");
      return;
    }
    if(parseFloat(amount)<=0){
      setError("Amount should be greater than 0");
      return;
    }
      dispatch({
        type: "ADD_EXPENSE",
        payload: {
          id: Date.now(),
          title,
          amount: parseFloat(amount),
          type,
          date: new Date().toLocaleDateString() // Get current date
        }
      });
  
      setTitle("");
      setAmount("");
      setType("Expense");
      setError("");
      navigate("/"); // Redirect to Home
    
  };
  

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Add Expense</h2>
      
      {/* Form Layout */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: "10px", width: "200px" }}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => {
            const value=e.target.value;
            setAmount(value);
            if(value<=0){
              setError("Amount should not be Negative");
            }
            else{
              setError("");
            }
          }}
          required
          style={{ padding: "10px", width: "150px" }}
        />
        <select value={type} onChange={(e) => setType(e.target.value)} style={{ padding: "10px", width: "150px" }}>
          <option value="Expense">Expense</option>
          <option value="Earning">Earning</option>
        </select>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Add Button */}
      <button onClick={handleSubmit} style={{ padding: "10px 20px", backgroundColor: "#4CAF50", color: "white", border: "none", cursor: "pointer" }}>
        Add Expense
      </button>
    </div>
  );
};

export default AddExpense;
