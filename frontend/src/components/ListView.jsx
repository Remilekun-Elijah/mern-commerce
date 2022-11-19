import React from "react";
import { Link } from "react-router-dom";
import { useProductsContext } from "../contexts/products_context";
import { useFilterContext } from "../contexts/filter_context";
import { formatPrice } from "../utils/helpers";

const ListView = () => {
  const {
    fetchSingleProduct,
    fetchRecommendedProducts,
    query,
  } = useProductsContext();

  const { filtered_products: products } = useFilterContext();

  const handlePath = (id) => {
    return query ? `products/:${id}` : `:${id}`;
  };

  const handleClick = (id, category) => {
    fetchSingleProduct(id);
    fetchRecommendedProducts(id, category.id);
  };

  return (
    <main className="listView">
      {products.map(
        ({ title, id, price, images, description, category: c }) => {
          return (
            <div className="productList" key={id}>
              <figure className="productList__fig">
                <Link to={handlePath(id)} onClick={() => handleClick(id, c)}>
                  <img
                    src={images[0]}
                    alt={title}
                    className="productList__img"
                  />
                </Link>

                <footer>
                  <Link to={handlePath(id)} onClick={() => handleClick(id, c)}>
                    <h2 className="productList__name">{title}</h2>
                  </Link>
                  <Link to={handlePath(id)} onClick={() => handleClick(id, c)}>
                    <p className="productList__price">{formatPrice(price)}</p>
                  </Link>
                </footer>
              </figure>
              <article className="productList__description">
                <p>{description}</p>
              </article>
            </div>
          );
        }
      )}
    </main>
  );
};

export default ListView;
