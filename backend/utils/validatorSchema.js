const joi = require("joi");

exports.categorySchema = joi.object({
  name: joi.string().min(3).max(50).label("Category Name").required(),
  image: joi.string().label("Category Image"),
});

exports.productSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  images: joi.array().items(joi.string()).max(4),
  price: joi.number().min(1),
  discountPercentage: joi.number().min(0),
  rating: joi.number(),
  stock: joi.number(),
  brand: joi.string(),
  category: joi.string().required(),
  thumbnail: joi.string(),
});

exports.userSchema = joi.object({
  name: joi.string().min(3).max(50).label("Name").required(),
  username: joi.string().min(3).max(30).required(),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  repeat_password: joi.ref("password"),
  email: joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "co", "org", "ng", "net"] },
  }),
  role: joi.string(),
  profileImage: joi.string().label("User Profile Image"),
  phone: joi.string(),
  addressOne: joi.string(),
  addressTwo: joi.string(),
});
