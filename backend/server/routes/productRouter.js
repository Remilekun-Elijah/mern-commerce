const router = require("express").Router();
const controller = require("../controller/productController");
const upload = require("../../utils/imgUploader");
// const authMiddleWare = require("../middleWares/authorization");

router.post(
  "/",
  // authMiddleWare,
  upload.array("images", 4),
  controller.createProduct
);

router.delete(
  "/:id",
  // authMiddleWare,
  controller.deleteProduct
);

router.get("/", controller.getProducts);
router.get("/search", controller.searchProduct);
router.get("/:id", controller.getSingleProduct);
router.get("/category/:id", controller.getProductByCategory);

module.exports = router;
