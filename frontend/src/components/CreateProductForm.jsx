import React from "react";

const CreateProductForm = () => {
  return (
    <div>
      <h2> Products </h2>
      <form>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          // value={title}
          required
          // onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          // value={description}
          required
          // onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="price">Price</label>
        <input
          type="text"
          name="price"
          id="price"
          // value={price}
          required
          // onChange={(e) => setPrice(e.target.value)}
        />
        <label htmlFor="discountPercentage">DiscountPercentage</label>
        <input
          type="text"
          name="discountPercentage"
          id="discountPercentage"
          required
          // value={discountPercentage}
          // onChange={(e) => setDiscountPercentage(e.target.value)}
        />
        <label htmlFor="rating">Rating</label>
        <input
          type="text"
          name="rating"
          id="rating"
          required
          // value={rating}
          // onChange={(e) => setRating(e.target.value)}
        />
        <label htmlFor="stock">Stock</label>
        <input
          type="text"
          name="stock"
          id="stock"
          required
          // value={stock}
          // onChange={(e) => setStock(e.target.value)}
        />
        <label htmlFor="brand">Brand</label>
        <input
          type="text"
          name="brand"
          id="brand"
          required
          // value={brand}
          // onChange={(e) => setBrand(e.target.value)}
        />
        <label htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          id="category"
          required
          // value={category}
          // onChange={(e) => setCategory(e.target.value)}
        />
        <br />
        <input type="file" name="images" />

        <button className="signUpBtn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateProductForm;
