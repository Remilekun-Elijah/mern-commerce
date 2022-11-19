import React from "react";
import { Link } from "react-scroll";
import { productsCategoriesNames } from "../utils/constants";
import { useProductsContext } from "../contexts/products_context";

const NavMenu = () => {
  const { isMenuOpen, closeMenu } = useProductsContext();

  if (isMenuOpen) {
    return (
      <nav className="navbar">
        <h3 className="heading-3">Home</h3>
        <ul className="nav-menu">
          {productsCategoriesNames.map((category) => {
            return (
              <li className="nav-menu__item" key={category.id}>
                <Link
                  to={category.url}
                  spy={true}
                  smooth={true}
                  offset={-900}
                  duration={500}
                  onClick={closeMenu}
                  className="nav-menu__link"
                >
                  {category.text}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
  return null;
};

export default NavMenu;
