import React, { useState } from "react";
import Accordion from "./accordion-widget/Accordion";
import Search from "./wikipedia-search-widget/Search";
import Dropdown from "./dropdown-widget/Dropdown";
import Translate from "./translate-widget/Translate";
import Route from "./Route";
import Header from "./Header";

const items = [
  {
    title: "What is React?",
    content: "React is a frontend JavaScript framework",
  },
  {
    title: "Why Use React",
    content: "React is a favourite JavaScript library among engineers",
  },
  {
    title: "How do you use React?",
    content: "You use React by creating component",
  },
];
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

/*
const showAccordion = () => {
  if (window.location.pathname === "/") {
    return <Accordion items={items} />;
  }
};
const showList = () => {
    if (window.location.pathname === "/list") {
        return <Search />;
      }
};
const showDropdown = () => {
    if (window.location.pathname === "/dropdown") {
        return <Dropdown />;
      }
};
const showTranslate = () => {
    if (window.location.pathname === "/translate") {
        return <Translate />;
      }
};

const App = () => {
  return (
    <div>
      {showAccordion()}
      {showList()}
      {showDropdown()}
      {showTranslate()}
    </div>
  );
};
*/

const App = () => {
  const [selected, setSelected] = useState(options[0]);
  return (
    <div>
      <Header />
      <Route path="/">
        <Accordion items={items} />
      </Route>
      <Route path="/list">
        <Search />
      </Route>
      <Route path="/dropdown">
        <Dropdown
          label="Select a Color"
          selected={selected}
          onSelectedChange={setSelected}
          options={options}
        />
      </Route>
      <Route path="/translate">
        <Translate />
      </Route>
    </div>
  );
};

export default App;
