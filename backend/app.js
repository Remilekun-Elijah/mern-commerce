const express = require("express");
const app = express();
const cors = require("cors"); /* for allowing cross platform request */
require("dotenv").config();

//DATABASE FOR CONNECTION
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRouter = require("./server/routes/userRouter");
const categoryRouter = require("./server/routes/categoryRouter");
const productRouter = require("./server/routes/productRouter");
const orderRouter = require("./server/routes/order");


const fs = require("fs");
const path = require("path");
const loadSeedData = require("./utils/loadSeed");

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(cors());

// FOR IMAGE UPLOADS TO THE DATABASE
fs.readdir("./uploads", { encoding: "utf8" }, (err) => {
  if (err) {
    fs.mkdirSync("./uploads", { encoding: "utf8" }, (err) => {
      if (err) console.log("Could not create directory: " + err.message);
      else console.log("Directory created successfully");
    });
  }
  // else console.log("Directory already exist");
});
app.use(express.static(path.join(__dirname, "/uploads")));

loadSeedData();

// CONNECT THE MONGO DB ONLINE
mongoose.connect(process.env.MONGODB_URL, function (err) {
  if (err) {
    console.error("Failed to connect", err);
  } else {
    console.log("connected");
  }
});

//imports all routes from routes folder
app.use("/auth", userRouter);
app.use("/category", categoryRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running at port ${port}`));
