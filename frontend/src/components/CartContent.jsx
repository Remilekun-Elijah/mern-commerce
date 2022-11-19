import React from "react";
import { useCartContext } from "../contexts/cart_context";
import { Link } from "react-router-dom";
import CartColumns from "./CartColumns";
import CartItem from "./CartItem";
import CartTotals from "./CartTotals";

const CartContent = () => {
  const { cart, clearCart } = useCartContext();
  return (
    <div>
      <CartColumns />

      {cart.map((item) => {
        return <CartItem key={item.id} {...item} />;
      })}
      <div className="cart-more">
        <Link className="cart-more__continue" to="/products">
          Continue Shopping
        </Link>
        <button className="cart-more__clear text-gray-500" type="button" onClick={clearCart}>
          Clear Shopping Cart
        </button>
      </div>
      <CartTotals />
    </div>
  );
};

export default CartContent;
