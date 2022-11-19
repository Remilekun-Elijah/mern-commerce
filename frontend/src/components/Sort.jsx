import React from "react";
import { useFilterContext } from "../contexts/filter_context";

const Sort = () => {
  const { sort, upDateSort } = useFilterContext();

  return (
    <div className="select__price">
      <label htmlFor="sort_price">Sort by:</label>
      <select
        name="sort"
        id="sort"
        value={sort}
        onChange={upDateSort}
        className="select__price-order"
      >
        <option value="price-lowest">Price (Lowest)</option>
        <option value="price-highest">Price (Highest)</option>
        <option value="name-a">Name (A-Z)</option>
        <option value="name-z">Name (Z - A)</option>
      </select>
    </div>
  );
};

export default Sort;
