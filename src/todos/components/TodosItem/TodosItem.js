import { useState } from "react";
import Backdrop from "../Backdrop/Backdrop";
import Modal from "../Modal/Modal";
import "./TodosItem.css";

const TodosItem = (props) => {

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const deleteHandler = () => {
    setModalIsOpen(true);
  }

  const closeModalHandler = () =>{
    setModalIsOpen(false);
  }

  return (
    <div className="card">
      <h1>{props.text}</h1>
      <div className="actions">
        <button className="btn" onClick={deleteHandler}>Delete</button>
      </div>
      {modalIsOpen && <Modal onCancel={closeModalHandler} onConfirm={closeModalHandler} />}
      {modalIsOpen && <Backdrop onClick={closeModalHandler}/>}
    </div>
  );
};

export default TodosItem;
