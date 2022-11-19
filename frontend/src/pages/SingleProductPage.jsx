import React from "react";
import { formatPrice } from "../utils/helpers";
import { useProductsContext } from "../contexts/products_context";
import { LoadingSpinal } from "../components";
import LoadingErrorMsg from "../components/LoadingErrorMsg";
import ProductImages from "../components/ProductImages";
import {
  PageNavbar,
  Stars,
  RecommendedProducts,
  AddToCart,
} from "../components";

const SingleProductPage = () => {
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,

    recommended_products_loading,
    recommended_products_error,
    recommended_products,
  } = useProductsContext();

  if (loading) {
    return (
      <>
        <PageNavbar />
        <main className="singleProductPage ">
          <div className="pageHero"></div>
          <LoadingSpinal />
        </main>
      </>
    );
  }
  if (error) {
    return (
      <>
        <PageNavbar />
        <main className="singleProductPage ">
          <div className="pageHero"></div>
          <LoadingErrorMsg />
        </main>
      </>
    );
  }
  const {
    brand,
    id,
    price,
    stock,
    title,
    rating,
    description,
    images,
  } = product?.data;
  return (
    <>
      <PageNavbar />
      <main className="singleProductPage ">
        <div className="pageHero">
          <h2 className="pageHero__text">{title}</h2>
        </div>

        <section className="detail">
          <ProductImages images={images} />

          <article className="detail__desc">
            <h3>{description}</h3>

            <Stars rating={rating} />

            <div className="more-info">
              <h3 style={{ fontSize: "1.9rem" }}>Price :</h3>
              <p style={{ fontSize: "2.4rem" }} className="amount">
                {formatPrice(price)}
              </p>
              <h3>Available :</h3>
              <p>{stock !== 0 ? "In Stock" : "Out of Stock"}</p>
              <h3>SKU :</h3>
              <p>{id}</p>
              <h3>Brand :</h3>
              <p>{brand}</p>
            </div>

            {stock > 0 && <AddToCart product={product} />}
          </article>
        </section>

        <div className="like">
          <h3>You may also like</h3>
        </div>

        <RecommendedProducts
          loading={recommended_products_loading}
          error={recommended_products_error}
          products={recommended_products}
        />
      </main>
    </>
  );
};

export default SingleProductPage;
