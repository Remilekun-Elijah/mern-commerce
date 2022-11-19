const Order = require("../model/order");
const Product = require("../model/product");

exports.fakeStripeAPI = async ({ amount, currency }) => {
  const client_secret = "someRandomValue";
  return { client_secret, amount };
};

exports.createOrder = async (req, res) => {
  const { items: cartItems, shippingFee } = req.body;

  if (!cartItems || cartItems.length < 1) {
    res.status(204).json({ success: false, message: "No cart items provided" });
  }
  if (!shippingFee) {
    res.status(400).json({
      success: false,
      message: "Please provide shipping fee",
    });
  }

  let orderItems = [];
  let subtotal = 0;

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });
    if (!dbProduct) {
      res.status(400).json({
        success: false,
        message: `No product with id : ${item.product}`,
      });
    }
    const { name, price, image, _id } = dbProduct;
    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id,
    };
    // add item to order
    orderItems = [...orderItems, singleOrderItem];
    // calculate subtotal
    subtotal += item.amount * price;
  }
  // calculate total
  const total = shippingFee + subtotal;
  // get client secret
  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: "usd",
  });

  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    user: req.user.userId,
  });

  res.status(201).json({ order, clientSecret: order.clientSecret });
};

exports.getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(200).json({ orders, count: orders.length });
};

exports.getSingleOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    res.status(400).json({
      success: false,
      message: `No order with id : ${orderId}`,
    });
  }
  checkPermissions(req.user, order.user);
  res.status(200).json({ order });
};

exports.getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId });
  res.status(200).json({ orders, count: orders.length });
};

exports.updateOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const { paymentIntentId } = req.body;

  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    res.status(400).json({
      success: false,
      message: `No order with id : ${orderId}`,
    });
  }
  checkPermissions(req.user, order.user);

  order.paymentIntentId = paymentIntentId;
  order.status = "paid";
  await order.save();

  res.status(200).json({ order });
};
