import TodosItem from "../TodosItem/TodosItem";
import "./Todos.css";

const Todos = () => {
  return (
    <div>
      <h1>My Todos</h1>
      <TodosItem text="Learning React"/>
      <TodosItem text="Learning Angular"/>
      <TodosItem text="Learning Spring"/>
      <TodosItem text="Learning Java"/>
    </div>
  );
};

export default Todos;
