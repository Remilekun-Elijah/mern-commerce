import React from "react";
import { formatPrice } from "../utils/helpers";
import { useUserContext } from "../contexts/user_context";
import { useCartContext } from "../contexts/cart_context";
import { Link } from "react-router-dom";

const CartTotals = () => {
  const { total_amount } = useCartContext();
  const { myUser, loginWithRedirect } = useUserContext();
  return (
    <article className="cart-detail">
      <h4 className="cart-detail__total">
        Order Total :<span>{formatPrice(total_amount)}</span>
      </h4>
      {myUser ? (
        <Link className="cart-detail__login" to="/checkout">
          Checkout
        </Link>
      ) : (
        <button
          type="button"
          onClick={loginWithRedirect}
          className="cart-detail__login"
        >
          Login
        </button>
      )}
    </article>
  );
};

export default CartTotals;
