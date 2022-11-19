import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const AmountButtons = ({ increase, decrease, amount }) => {
  return (
    <>
      <button onClick={decrease}>
        <FaMinus />
      </button>
      <h2 className="cart__amount">{amount}</h2>
      <button onClick={increase}>
        <FaPlus />
      </button>
    </>
  );
};

export default AmountButtons;
