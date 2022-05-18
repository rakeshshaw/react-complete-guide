import { Fragment } from "react";
import mealsImage from "../../../assets/meals.jpg";
import CartButton from "../CartButton/CartButton";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <CartButton onClick={props.onCartButtonClick} />
        <p></p>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="Delicious food" />
      </div>
    </Fragment>
  );
};

export default Header;
