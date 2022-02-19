import { useState } from "react";
import ExpenseForm from "./ExpenseForm/ExpenseForm";
import "./NewExpense.css";

const NewExpense = (props) => {
  const [showForm, setShowForm] = useState(false);

  const saveExpenseHandler = (data) => {
    props.onAddNewExpense(data);
    setShowForm(false);
  };

  return (
    <div className="new-expense">
      {!showForm && (
        <button onClick={() => setShowForm(true)}>Add Expense</button>
      )}
      {showForm && (
        <ExpenseForm
          onSave={saveExpenseHandler}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default NewExpense;
