const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },

    images: [
      {
        type: String,
      },
    ],
    price: Number,
    discountPercentage: Number,
    rating: Number,
    stock: Number,
    brand: String,
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
    },
    thumbnail: String,
  },
  {
    timestamps: true,
  }
);

mongoose.set("toJSON", {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id;
  },
});

const productModel = mongoose.model("product", productSchema);
module.exports = productModel;
