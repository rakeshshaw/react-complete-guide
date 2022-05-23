import Accordion from "./Accordion";

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

const App = () => {
  return (
    <div>
      <Accordion items={items} />
    </div>
  );
};

export default App;
