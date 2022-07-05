import { useState } from "react";
import AddUser from "./components/Users/AddUser";
import UsersList from "./components/Users/UsersList";

const App = () => {
  const [usersList, setUsersList] = useState([]);
  const onAddUserHandler = (name, age) => {
    setUsersList((prevList) => {
        console.log(prevList);
      // return [...prevList, {name: name, age: age}];
      return [...prevList, { name, age, id: Math.random().toString() }];
    });
  };
  return (
    <div>
      <AddUser onAddUser={onAddUserHandler} />
      <UsersList users={usersList} />
    </div>
  );
};

export default App;
