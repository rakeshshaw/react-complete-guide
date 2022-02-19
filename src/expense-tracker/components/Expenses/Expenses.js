import { useState } from "react";
import ExpenseFilter from "./ExpenseFilter/ExpenseFilter";
import Card from "../UI/Card/Card";

import "./Expenses.css";
import ExpensesList from "./ExpensesList/ExpensesList";

const Expenses = (props) => {
  const [selectedYear, setSelectedYear] = useState("2020");

  // This entire code block can be commented out and used in one line in JSX itself using JS 2015 feature
  // const filterHandler = (year) => {
  //   setSelectedYear(year);
  // };

  const filteredExpenses = props.expenses.filter((expense) => expense.date.getFullYear().toString() === selectedYear);

  return (
    <Card className="expenses">
      <ExpenseFilter selected={selectedYear} onFilter={setSelectedYear} />
      <ExpensesList expenses={filteredExpenses} />
    </Card>
  );
};

export default Expenses;
