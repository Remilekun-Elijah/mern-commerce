import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper";
import { useProductsContext } from "../contexts/products_context";
import { formatPrice } from "../utils/helpers";

const RecommendedProducts = ({ loading, error, products }) => {
  const { fetchSingleProduct, fetchRecommendedProducts } = useProductsContext();

  const handleClick = (id, category) => {
    fetchSingleProduct(id);
    fetchRecommendedProducts(id, category.id);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Sorry, An Error Occured</div>;
  }
  return (
    <section className="recommended-products">
      <Swiper
        slidesPerView={2}
        centeredSlides={false}
        slidesPerGroupSkip={1}
        grabCursor={true}
        keyboard={{
          enabled: true,
        }}
        breakpoints={{
          769: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
        }}
        scrollbar={false}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Keyboard, Scrollbar, Navigation, Pagination]}
        className="mySwiper"
      >
        {products.map((product) => {
          console.log(product);
          const { id, images, price, title, category: c } = product;
          return (
            <SwiperSlide key={id}>
              <figure>
                <img
                  src={images[0]}
                  alt={title}
                  onClick={() => handleClick(id, c)}
                />
              </figure>
              <div>
                <h3>{title}</h3>
                <p>{formatPrice(price)}</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default RecommendedProducts;
