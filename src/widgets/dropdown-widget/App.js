import { useState } from "react";
import Dropdown from "./Dropdown";

const options = [
  {
    label: "The Red",
    value: "red",
  },
  {
    label: "The Green",
    value: "green",
  },
  {
    label: "The Blue",
    value: "blue",
  },
];

const App = () => {
  const [selected, setSelected] = useState(options[0]);
  return (
    <div>
      <Dropdown label={"Select a Color"} selected={selected} onSelectedChange={setSelected} options={options} />
    </div>
  );
};

export default App;
