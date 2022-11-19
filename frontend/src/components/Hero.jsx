import React from "react";
import { Link } from "react-router-dom";
import { useProductsContext } from "../contexts/products_context";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import { heroLink } from "../utils/constants";

const Hero = () => {
  const { fetchProducts } = useProductsContext();

  return (
    <div className="hero">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {heroLink.map(({ id, image, name, text, url }) => {
          return (
            <SwiperSlide key={id}>
              <h3 className="hero__text">{text}</h3>
              <figure className="hero__fig">
                <Link to={url}>
                  <img
                    src={image}
                    alt=""
                    className="hero__photo"
                    onClick={() => fetchProducts(name)}
                  />
                </Link>
              </figure>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Hero;
