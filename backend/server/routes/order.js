const router = require("express").Router();
const controller = require("../controller/order");
const authMiddleWare = require("../middleWares/authorization");

router.post(
 "/",
 authMiddleWare,
  controller.createOrder
);

router.get("/:id", controller.getOrder);
router.get("/", authMiddleWare, controller.getOrders);

module.exports = router;
