const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    products: [{
      product: {
        type: mongoose.Types.ObjectId,
      ref: "product"
      },
      quantity: Number
    }],
    user: {
     type: mongoose.Types.ObjectId,
      ref: "user"
    },
    orderId: String,
    transactionId: "",
    status: {
     type: String,
     enum: ["Delivered", "In-Transit", "Placed"],
     default: "Placed"
    },
    totalCost: String,
    itemCount: Number
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

OrderSchema.pre(/^find/, function(next){
this.populate([{
  path: "products.product",
  populate:{
    path: "category"
  }
}])

next()
})

const orderModel = mongoose.model("order", OrderSchema);
module.exports = orderModel;