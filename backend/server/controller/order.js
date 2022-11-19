// const { categorySchema } = require("../utils/validatorSchema");
const Order = require("../model/order");
const Product = require("../model/product")
const randomstring = require('randomstring')

exports.createOrder = async (req, res, next) => {

  try {
   const payload = req.body;
   payload.user = res.locals.id;
   payload.orderId = randomstring.generate({length: 7, readable: true, charset: "alphanumeric"})



const order = await (await Order.create(payload))

if(order) {
 order.products.forEach(async data => {
  console.log(data);
  await Product.findByIdAndUpdate(data.product, {$inc:{quantity: -data.quantity}})
 })
}
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });

  } catch (error) {
   console.log(error);
    if (error.details) {
      res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  }
};

exports.getOrder = async (req, res) => {
 try {
   const data = await Order.findById(req.params.id)

   if(data){
   res.status(200).json({
     success: true,
     message: "Order retrieved successfully",
     data,
   });
  }
  else {
   res.status(404).json({
    success: false,
    message: "order not found",
  });
  }
 } catch (error) {
   res.status(500).json({ success: false, message: "Something went wrong" });
 }
};


exports.getOrders = async (req, res) => {
  try {
    const data = await Order.find({user: res.locals.id});
    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
