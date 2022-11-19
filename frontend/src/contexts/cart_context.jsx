import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";
import Storage from "../utils/storage";

const getLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    return [];
  }
};

const initialState = {
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  let cart = Storage.get("cart")
  if(cart) cart = JSON.parse(cart)


  function getOrderPayload (transactionId){
    const payload = {
      transactionId,
      user: JSON.parse(Storage.get("user")).id,
      totalCost: sumPrice("cart"),
      products: cart.map(({id, amount}) => ({product: id, quantity: amount})),
      itemCount: getLength()
    }
  
    return payload;
   }

  function sumPrice (type) {
    let total=0;
    if(type === 'product') total = product.amount * product.price
    else if (type === 'cart' && cart.length) total = cart.map(({amount, price}) => amount * price).reduce((acc, curr) => acc+curr )
    return total;
   }

   function getLength(){
    if(cart.length) return cart?.map(({amount}) => amount)?.reduce((acc, curr) => acc + curr)
   }

  const addTOCart = (id, amount, product) => {
    dispatch({ type: ADD_TO_CART, payload: { id, amount, product } });
  };

  const removeItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };

  const toggleAmount = (id, value) => {
    dispatch({
      type: TOGGLE_CART_ITEM_AMOUNT,
      payload: {
        id,
        value,
      },
    });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
    dispatch({ type: COUNT_CART_TOTALS });
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{ ...state, addTOCart, removeItem, toggleAmount, clearCart, sumPrice, getLength, getOrderPayload }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCartContext = () => {
  return useContext(CartContext);
};
