import { useReducer } from "react";
import CartContext from "./cart-context";

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
    if(action.type === 'ADD') {
        console.log('INSIDE ADD');
        console.log(state.items);
        const updatedItems = state.items.concat(action.payload.item);
        const updatedTotalAmount= state.totalAmount + (action.payload.item.price * action.payload.item.qty);
        console.log(state.items);
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    if(action.type === 'REMOVE') {
        const updatedItems = state.items.filter((item) => item.id !== action.payload.id);
        const updatedTotalAmount= state.totalAmount - (updatedItems[action.payload.id].price * updatedItems[action.payload.id].qty);
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
  return initialState;
};

const CartProvider = (props) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const cartContext = {
    items: state.items,
    totalAmount: state.totalAmount,
    addItem: (item) => {
      dispatch({
        type: "ADD",
        payload: {
          item: item,
        },
      });
    },
    removeItem: (id) => {
      dispatch({
        type: "REMOVE",
        payload: {
          id: id,
        },
      });
    },
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
