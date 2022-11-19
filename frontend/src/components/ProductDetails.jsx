// import React from "react";

// import { useProductsContext } from "../contexts/products_context";

// import ProductImages from "./ProductImages";
// import LoadingSpinal from "./LoadingSpinal";
// import LoadingErrorMsg from "./LoadingErrorMsg";
// import Stars from "./Stars";
// import { RecommededProducts } from ".";

// import { formatPrice } from "../utils/helpers";

// const ProductDetails = () => {
//   const {
//     single_product_loading: loading,
//     single_product_error: error,
//     single_product: product,

//     recommended_products_loading,
//     recommended_products_error,
//     recommended_products,
//   } = useProductsContext();

//   if (loading) {
//     return <LoadingSpinal />;
//   }
//   if (error) {
//     return <LoadingErrorMsg />;
//   }

//   const { brand, id, price, stock, title, rating, description, images } =
//     product.data;

//   return (
//     <>
//       <section className="detail">
//         <ProductImages images={images} />

//         <article className="detail__desc">
//           <h3>{description}</h3>

//           <Stars rating={rating} />

//           <div className="more-info">
//             <h3 style={{ fontSize: "1.9rem" }}>Price :</h3>
//             <p style={{ fontSize: "2.4rem" }} className="amount">
//               {formatPrice(price)}
//             </p>
//             <h3>Available :</h3>
//             <p>{stock !== 0 ? "In Stock" : "Out of Stock"}</p>
//             <h3>SKU :</h3>
//             <p>{id}</p>
//             <h3>Brand :</h3>
//             <p>{brand}</p>
//           </div>

//           <div className="cart">
//             <button>-</button>
//             <p>1</p>
//             <button>+</button>
//             <button className="cart__btn">add to cart</button>
//           </div>
//         </article>
//       </section>

//       <div className="like">
//         <h3>You may also like</h3>
//       </div>

//       <RecommededProducts
//         loading={recommended_products_loading}
//         error={recommended_products_error}
//         products={recommended_products}
//       />
//     </>
//   );
// };

// export default ProductDetails;
