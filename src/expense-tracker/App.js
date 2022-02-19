import React, { useState } from "react";
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpenses/NewExpense";
import DUMMY_EXPENSES from "./apis/dummy/dummy-expenses"

function App() {

  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

  const addNewExpenseHandler = (expense) => {
    console.log('addNewExpenseHandler', expense);
    setExpenses((prevExpense) => {
      return [expense, ...prevExpense];
    })
  }

  return (
    <div>
      <h2>Expense Tracker</h2>
      <NewExpense onAddNewExpense={addNewExpenseHandler} />
      <Expenses expenses={expenses} />
    </div>
  );

  // Alternative way of rendering JSX using plain JS
  // return React.createElement(
  //   "div",
  //   {},
  //   React.createElement("h2", {}, "Expense Tracker"),
  //   React.createElement(Expenses, { expenses: expenses })
  // );
}

export default App;
