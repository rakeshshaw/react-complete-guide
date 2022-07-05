import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import { useState } from "react";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (username.trim().length === 0 || age.trim().length === 0) {
      setError({
        title: "Invalid user name",
        message: "Please enter user name",
      });
      return;
    }
    if (+age < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter age",
      });
      return;
    }
    props.onAddUser(username, age);
    console.log(username, age);
    setUsername("");
    setAge("");
  };

  const errorHandler = () => {
    setError(null);
  }

  return (
    <div>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
      <Card className={classes.input}>
        <form onSubmit={onSubmitHandler}>
          <label htmlFor="username">User Name</label>
          <input
            value={username}
            id="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="age">Age (years)</label>
          <input
            value={age}
            id="age"
            type="number"
            onChange={(e) => setAge(e.target.value)}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
