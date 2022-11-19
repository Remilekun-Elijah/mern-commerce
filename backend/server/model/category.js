const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },

    image: String,
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

const categoryModel = mongoose.model("category", categorySchema);
module.exports = categoryModel;
