const router = require("express").Router();
const controller = require("../controller/categoryController");
const upload = require("../../utils/imgUploader");
// const authMiddleWare = require("../middleWares/authorization");

router.post(
  "/",
  // authMiddleWare,
  upload.single("image"),
  controller.createCategory
);

router.delete("/:id", controller.deleteCategory);

router.get("/", controller.getCategories);

module.exports = router;
