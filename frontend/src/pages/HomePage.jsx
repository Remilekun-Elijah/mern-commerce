import React from "react";
import { LoadingSpinal } from "../components";
import { useProductsContext } from "../contexts/products_context";
import { useFilterContext } from "../contexts/filter_context";
import {
  Navbar,
  Hero,
  NavMenu,
  ProductsCategories,
  SelectBy,
  ProductsList,
  SearchHero,
} from "../components";

const HomePage = () => {
  const { filtered_products: products } = useFilterContext();
  const {
    query,
    query_products_loading: loading,
    query_products_error: error,
  } = useProductsContext();

  // if (loading) {
  //   return (
  //     <>
  //       <Navbar />
  //       <main className="homePage">
  //         <SearchHero />
  //         <LoadingSpinal />
  //       </main>
  //     </>
  //   );
  // }

  if (error) {
    return (
      <>
        <Navbar />
        <main className="homePage">
          <SearchHero />
        </main>
      </>
    );
  }

  if (query === "") {
    return (
      <>
        <Navbar />
        <main className="homePage">
          <Hero />
          <NavMenu />
          <ProductsCategories />
        </main>
      </>
    );
  } else {
    return (
      <>
        <Navbar />
        <main className="homePage">
          <SearchHero />
          <SelectBy />
          <ProductsList products={products} />
        </main>
      </>
    );
  }
};

export default HomePage;
