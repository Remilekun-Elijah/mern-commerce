import React from "react";
import { LoadingSpinal } from "../components";
import LoadingErrorMsg from "../components/LoadingErrorMsg";
import { SelectBy, ProductsList, PageNavbar } from "../components";
import { useProductsContext } from "../contexts/products_context";
import { useFilterContext } from "../contexts/filter_context";

const ProductsPage = () => {
  const {
    products_loading: loading,
    products_error: error,
  } = useProductsContext();
  const { filtered_products: products } = useFilterContext();

  if (loading) {
    return (
      <>
        <PageNavbar />
        <main className="productsPage">
          <div className="pageHero"></div>
          <LoadingSpinal />
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        {" "}
        <PageNavbar />
        <main className="productsPage">
          <div className="pageHero"></div>
          <LoadingErrorMsg />
        </main>
      </>
    );
  }

  const title = products.slice(-1).map(({ category }) => category.name);

  return (
    <>
      <PageNavbar />
      <main className="productsPage">
        <div className="pageHero">
          <h1 className="pageHero__text">{title}</h1>
        </div>
        <SelectBy />
        <ProductsList products={products} />
      </main>
    </>
  );
};

export default ProductsPage;
