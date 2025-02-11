import { createContext, useReducer } from "react";

const initialState = { expenses: [] };

const expenseReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return { expenses: [...state.expenses, action.payload] };
    case "DELETE_EXPENSE":
      return { expenses: state.expenses.filter(exp => exp.id !== action.payload) };
    default:
      return state;
  }
};

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  return (
    <ExpenseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  );
};
