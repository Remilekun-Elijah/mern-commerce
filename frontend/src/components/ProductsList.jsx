import React from "react";
import { useFilterContext } from "../contexts/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductsList = ({ products }) => {
  const { grid_view } = useFilterContext();
  if (grid_view === false) {
    return (
      <>
        <ListView products={products} />
      </>
    );
  }

  return (
    <>
      <GridView products={products} />
    </>
  );
};

export default ProductsList;
