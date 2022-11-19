import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../contexts/cart_context";
import AmountButtons from "./AmountButtons";

const AddToCart = ({ product }) => {
  const { addTOCart } = useCartContext();
  const { id, stock } = product.data;

  const [amount, setAmount] = useState(1);

  const increase = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount + 1;
      if (tempAmount > stock) {
        tempAmount = stock;
      }
      return tempAmount;
    });
  };
  const decrease = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount - 1;
      if (tempAmount < 1) {
        tempAmount = 1;
      }
      return tempAmount;
    });
  };

  return (
    <div className="add-to-cart">
      <AmountButtons increase={increase} decrease={decrease} amount={amount} />

      <Link
        className="add-to-cart__btn"
        to="/cart"
        onClick={() => addTOCart(id, amount, product)}
      >
        add to cart
      </Link>
    </div>
  );
};

export default AddToCart;
