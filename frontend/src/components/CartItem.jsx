import React from "react";
import { formatPrice } from "../utils/helpers";
import { AiOutlineClose } from "react-icons/ai";
import { useCartContext } from "../contexts/cart_context";
import AmountButtons from "./AmountButtons";

const CartItem = ({ id, image, name, price, amount }) => {
  const { removeItem, toggleAmount } = useCartContext();
  const increase = () => {
    toggleAmount(id, "inc");
  };
  const decrease = () => {
    toggleAmount(id, "dec");
  };
  return (
    <article className="cart__content">
      <figure className="cart__fig">
        <img src={image} alt={name} className="cart__photo" />
        <h5 className="cart__title">{name}</h5>
      </figure>
      <p>{formatPrice(price)}</p>
      <div className="cart__quantity">
        <AmountButtons
          increase={increase}
          decrease={decrease}
          amount={amount}
        />
      </div>
      <button
        className="cart__remove"
        type="button"
        onClick={() => removeItem(id)}
      >
        <AiOutlineClose />
      </button>
      <h5>{formatPrice(price * amount)}</h5>
    </article>
  );
};

export default CartItem;
