import { Fragment, useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

const App = (props) => {
  const [showCart, setShowCart] = useState(false);

  return (
    <CartProvider>
      {showCart && <Cart onClose={() => setShowCart(false)} onOrder={() => setShowCart(false)} />}
      <Header onCartButtonClick={() => setShowCart(true)} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
};

export default App;
