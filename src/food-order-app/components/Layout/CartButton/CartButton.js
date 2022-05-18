import { useContext } from "react";
import CartContext from "../../../store/cart-context";
import CartIcon from "../CartIcon/CartIcon";
import classes from "./CartButton.module.css";

const CartButton = (props) => {
  const cartCtx = useContext(CartContext);

  const totalUniqueItem = cartCtx.items.reduce((previousValue, item) => {
    return previousValue + item.qty;
  }, 0);

  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{totalUniqueItem}</span>
    </button>
  );
};

export default CartButton;
