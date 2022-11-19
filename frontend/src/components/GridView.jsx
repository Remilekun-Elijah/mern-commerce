import React from "react";
import { Link } from "react-router-dom";
import { useProductsContext } from "../contexts/products_context";
import { formatPrice } from "../utils/helpers";

const GridView = ({ products }) => {
  const {
    fetchSingleProduct,
    fetchRecommendedProducts,
    query,
  } = useProductsContext();

  const handlePath = (id) => {
    return query ? `products/:${id}` : `:${id}`;
  };

  const handleClick = (id, category) => {
    fetchSingleProduct(id);
    fetchRecommendedProducts(id, category.id);
  };

  return (
    <section className="gridView">
      {products.map(({ title, id, price, images, category: c }) => {
        return (
          <div className="product" key={id}>
            <figure className="product__fig">
              <Link to={handlePath(id)} onClick={() => handleClick(id, c)}>
                <img src={images[0]} alt={title} className="product__photo" />
              </Link>
            </figure>
            <footer className="product__description">
              <Link to={handlePath(id)} onClick={() => handleClick(id, c)}>
                {" "}
                <h3 className="product__name">{title}</h3>
              </Link>
              <Link to={handlePath(id)} onClick={() => handleClick(id, c)}>
                <p className="product__price"> {formatPrice(price)}</p>
              </Link>
            </footer>
          </div>
        );
      })}
    </section>
  );
};

export default GridView;
