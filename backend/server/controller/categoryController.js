const { categorySchema } = require("../../utils/validatorSchema");
const Category = require("../model/category");
const productModel = require("../model/product");

exports.createCategory = async (req, res, next) => {
  if (req.file) {
    req.body.image = `${req.protocol}://${req.hostname}:4000/${req.file.filename}`;
  }

  try {
    const payload = await categorySchema.validateAsync(req.body);
    const data = await Category.create(payload);

    res.status(201).json({
      success: true,
      message: "Category created successfully",
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

exports.getCategories = async (req, res) => {
  try {
    const data = await Category.find();
    res.status(200).json({
      success: true,
      message: "Category retrieved successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

exports.deleteCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Category.findByIdAndDelete(id);
    if (data) {
      await productModel.deleteMany({ category: id });

      res.status(200).json({
        success: true,
        message: "Category deleted successfully",
        data,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Category not found",
        data,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
