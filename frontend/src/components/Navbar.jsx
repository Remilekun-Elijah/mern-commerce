import React from "react";
import { useNavigate } from "react-router";
import { FaTimes } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { useProductsContext } from "../contexts/products_context";
import { useCartContext } from "../contexts/cart_context";
import { useUserContext } from "../contexts/user_context";

import {
  FaShoppingCart,
  FaUserPlus,
  FaUserMinus,
  FaBars,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { total_items } = useCartContext();
  const { logout, myUser } = useUserContext();
  const navigate = useNavigate();

  const {
    isMenuOpen,
    closeMenu,
    openMenu,
    queryProducts,
    query,
  } = useProductsContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query !== "") return;
  };

  return (
    <>
      <header className="header home">
        <Link className="logo" type="button" to="/">
          MISSB Store
        </Link>

        <form className="search" onSubmit={handleSubmit}>
          <input
            type="text"
            value={query}
            onChange={queryProducts}
            className="search__input"
            placeholder="Search by name e.g shirt"
          />
          <button className="search__btn" type="submit">
            <BsSearch />
          </button>
        </form>

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
              type="button"
            >
              <FaShoppingCart />
            </button>
            <span>{total_items}</span>
          </div>

          {myUser ? (
            <div>
              <button
                type="button"
                onClick={()=> {
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
              <button onClick={() => navigate("/login")}>
                Login
                <FaUserPlus />
              </button>
            </div>
          )}

          {!query ? (
            <button
              className={`${
                isMenuOpen ? "nav__hamburger--close" : "nav__hamburger"
              }`}
              type="button"
            >
              {isMenuOpen ? (
                <FaTimes onClick={closeMenu} />
              ) : (
                <FaBars onClick={openMenu} />
              )}
            </button>
          ) : null}
        </nav>
      </header>
    </>
  );
};

export default Navbar;
