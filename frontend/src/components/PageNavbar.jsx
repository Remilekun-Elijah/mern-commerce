import React from "react";
import { FaShoppingCart, FaUserPlus, FaUserMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../contexts/cart_context";
import { useUserContext } from "../contexts/user_context";

const PageNavbar = () => {
  const { logout, myUser } = useUserContext();
  const { total_items } = useCartContext();
  const navigate = useNavigate();

  return (
    <>
      <header className="header pages">
        <button className="logo" onClick={() => navigate("/")}>
          MISSB Store
        </button>

        <nav className="nav">
          {myUser && (
            <>
            <button
              type="button"
              onClick={() => navigate("/checkout")}
              className="nav__checkout"
            >
              Checkout
            </button>

            <button
              type="button"
              onClick={() => navigate("/order")}
              className="nav__checkout"
            >
              Orders
            </button>

            {myUser.role !== "user" && (
              <button
              type="button"
              onClick={() => navigate("/product")}
              className="nav__checkout"
            >
              Create
            </button>
            )}
            </>
          )}

          <div className="nav__cart-box">
            <button
              className="nav__cart-text"
              onClick={() => navigate("/cart")}
            >
              Cart
            </button>
            <button
              className="nav__cart-icon"
              onClick={() => navigate("/cart")}
            >
              <FaShoppingCart />
            </button>
            <span>{total_items}</span>
          </div>

          {myUser ? (
            <div>
              <button
                type="button"
                onClick={() => {
                  logout()
                  navigate("/login")
                }}
              >
                Logout
                <FaUserMinus />
              </button>
            </div>
          ) : (
            <div>
              <button type="button" onClick={(_) => navigate("/login")}>
                Login
                <FaUserPlus />
              </button>
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default PageNavbar;
