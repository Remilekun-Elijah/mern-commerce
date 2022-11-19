import React from "react";
import { useFilterContext } from "../contexts/filter_context";
import { formatPrice } from "../utils/helpers";

const Filter = () => {
  const {
    filters: { min_price, price, max_price },
    updateFilter,
  } = useFilterContext();

  return (
    <div className="select__price-range">
      <p>{formatPrice(price)}</p>
      <input
        type="range"
        name="price"
        onChange={updateFilter}
        min={min_price}
        max={max_price}
        value={price}
      ></input>
    </div>
  );
};

export default Filter;
