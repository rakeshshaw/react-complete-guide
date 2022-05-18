import { useRef, useState } from "react";
import Input from "../../../UI/Input/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [isValid, setIsValid] = useState(true);
  const qtyRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const txtQty = qtyRef.current.value;
    const qty = +txtQty;
    console.log(qty);

    if (txtQty.trim().length === 0 || qty < 1) {
      setIsValid(false);
      return;
    }

    props.onAddToCart(qty);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={qtyRef}
        label="Qty"
        input={{
          type: "number",
          id: props.id,
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!isValid && <p>Not correct value</p>}
    </form>
  );
};

export default MealItemForm;
