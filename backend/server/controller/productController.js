const { productSchema } = require("../../utils/validatorSchema");
const Product = require("../model/product");

exports.createProduct = async (req, res, next) => {
  if (req.files.length) {
    req.body.images = [];
    req.files.map((image) => {
      req.body.images.push(
        `${req.protocol}://${req.hostname}:4000/${image.filename}`
      );
    });

    req.body.thumbnail = req.body.images[req.body.images.length - 1];
  }

  try {
    const payload = await productSchema.validateAsync(req.body);
    const data = await Product.create(payload);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data,
    });
  } catch (error) {
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

exports.getProducts = async (req, res) => {
  try {
    const data = await Product.find().populate("category", "name");
    res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

exports.getSingleProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Product.findById(id).populate("category", "name");
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({
        success: false,
        message: "Product not found",
        data,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

exports.searchProduct = async (req, res) => {
  try {
    let filter = {};
    if (req.query.q) {
      filter = {
        title: new RegExp(req.query.q, "i"),
      };
    }
    const products = await Product.find(filter).populate("category", "name");
    if (products) {
      res.status(200).json({
        success: true,
        message: "Product retrieved successfully",
        products,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

exports.getProductByCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const products = await Product.find({ category: id }).populate(
      "category",
      "name"
    );

    if (products) {
      res.status(200).json({
        success: true,
        message: "Product retrieved successfully",
        products,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Product.findByIdAndDelete(id);
    if (data) {
      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        data,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Product not found",
        data,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
