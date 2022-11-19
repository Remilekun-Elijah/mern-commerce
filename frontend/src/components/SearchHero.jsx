import React from "react";
import { useProductsContext } from "../contexts/products_context";
import { useFilterContext } from "../contexts/filter_context";

const SearchHero = () => {
  const { query, query_products_error: error } = useProductsContext();
  const { filtered_products: products } = useFilterContext();

  if (query !== "" && error !== true) {
    return (
      <div className="pageHero">
        <h2 className="pageHero__text">
          {products.length} Results Matches Your Search
        </h2>
      </div>
    );
  }
  if (error) {
    return (
      <div className="pageHero">
        <h2 className="pageHero__text">No Result Matches Your Search</h2>
      </div>
    );
  }
};

export default SearchHero;
