import React from "react";
import { Link } from "react-router-dom";
import { API_ENDPOINT } from "../utils/constants";
import { useProductsContext } from "../contexts/products_context";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const ProductsCategories = () => {
  const { fetchProducts } = useProductsContext();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        let res = await axios.get(`${API_ENDPOINT}category`);
        console.log(res);
        if (res.data.success) {
          setCategories(res.data.data);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <section className="productsCategories">
      {categories.map((product) => {
        const { id, name, image } = product;
        return (
          <div className="products" key={id} id={id}>
            <Link to="products" className="products__category">
              {" "}
              <h2 onClick={() => fetchProducts(id)}>{name}</h2>
            </Link>

            <Link to="products" className="products__img-box">
              <img
                src={image}
                alt={name}
                className="products__photo"
                onClick={() => fetchProducts(id)}
              />
            </Link>
            <Link
              to="products"
              className="products__link"
              onClick={() => fetchProducts(id)}
            >
              Shop now
            </Link>
          </div>
        );
      })}
    </section>
  );
};

export default ProductsCategories;
