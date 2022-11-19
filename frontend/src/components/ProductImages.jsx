import React from "react";

const ProductImages = ({ images }) => {
  const [main, setMain] = React.useState(images[0]);
  return (
    <figure className="detail__fig">
      <img src={main} className="detail__img" alt="" />
      <div className="detail__gallery">
        {images.map((image, index) => {
          return (
            <div className="detail__photo" key={index}>
              <img
                src={image}
                alt=""
                onClick={() => setMain(images[index])}
                className={`${main === image ? "detail__active-image" : null}`}
              />
            </div>
          );
        })}
      </div>
    </figure>
  );
};

export default ProductImages;
