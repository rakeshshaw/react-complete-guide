import ChartBar from "../ChartBar/ChartBar";
import "./Chart.css";

const Chart = (props) => {
  const amountArrayList = props.dataPoints.map((data) => data.value);
  const maxValue = Math.max(...amountArrayList);
  console.log(maxValue);
  console.log(props.dataPoints);
  return (
    <div className="chart">
      {props.dataPoints.map((dataPoint) => (
        <ChartBar
          key={dataPoint.label}
          value={dataPoint.value}
          label={dataPoint.label}
          maxValue={maxValue}
        />
      ))}
    </div>
  );
};

export default Chart;
