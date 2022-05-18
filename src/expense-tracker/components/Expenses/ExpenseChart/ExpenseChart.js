// import { useEffect, useState } from "react";
import DUMMY_CHART_DATA from "../../../apis/dummy/dummy-chart-data";
import Chart from "../../UI/Chart/Chart";
/*
const ExpenseChart = (props) => {
  // const [dataPoints, setDataPoints] = useState(DUMMY_CHART_DATA);
  // useEffect({
  //   originalData: DUMMY_CHART_DATA
  // }, []);
  let chartBarValues = DUMMY_CHART_DATA;
  console.log(DUMMY_CHART_DATA);
    for (const expense of props.expenses) {
      const month = expense.date.getMonth();
      chartBarValues[month].value += expense.amount;
    }

  return <Chart dataPoints={chartBarValues} />;
    
};

export default ExpenseChart;
*/


const ExpensesChart = (props) => {
  const chartBarValues = [
    { label: "Jan", value: 0 },
    { label: "Feb", value: 0 },
    { label: "Mar", value: 0 },
    { label: "Apr", value: 0 },
    { label: "May", value: 0 },
    { label: "Jun", value: 0 },
    { label: "Jul", value: 0 },
    { label: "Aug", value: 0 },
    { label: "Sep", value: 0 },
    { label: "Oct", value: 0 },
    { label: "Nov", value: 0 },
    { label: "Dec", value: 0 },
  ];

  for (const expense of props.expenses) {
    const month = expense.date.getMonth();
    chartBarValues[month].value += expense.amount;
  }

  return <Chart dataPoints={chartBarValues} />;
};

export default ExpensesChart;

