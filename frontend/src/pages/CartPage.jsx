import React from "react";
import { PageNavbar } from "../components";
import { useCartContext } from "../contexts/cart_context";
import { Link } from "react-router-dom";
import { CartContent } from "../components";

const CartPage = () => {
  const { cart } = useCartContext();

  if (cart.length < 1) {
    return (
      <>
        <PageNavbar />
        <main className="cartPage">
          <div className="pageHero">
            <h1 className="pageHero__text">Cart</h1>
          </div>
          <div className="loadingError ">
            <h2>Your cart is empty</h2>
            <Link to="/" className="cart-detail__empty">
              Go Shopping
            </Link>
          </div>
        </main>
      </>
    );
  }
  return (
    <>
      <PageNavbar />
      <main className="cartPage">
        <div className="pageHero">
          <h2 className="pageHero__text">Cart</h2>
        </div>

        <section className="cart">
          <CartContent />
        </section>
      </main>
    </>
  );
};

export default CartPage;
