const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    username: {
      type: String,
    },

    password: {
      type: String,
    },

    email: {
      type: String,
      unique: true,
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    profileImage: String,
    phone: String,
    addressOne: String,
    addressTwo: String,
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
