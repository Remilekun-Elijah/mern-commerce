const router = require("express").Router();

const {
  authenticateUser,
  authorizePermissions,
} = require("../middleWares/authentication");

const orderController = require("../controller/orderController");

router
  .route("/")
  .post(authenticateUser, orderController.createOrder)
  .get(
    authenticateUser,
    authorizePermissions("admin"),
    orderController.getAllOrders
  );

router
  .route("/showAllMyOrders")
  .get(authenticateUser, orderController.getCurrentUserOrders);

router
  .route("/:id")
  .get(authenticateUser, orderController.getSingleOrder)
  .patch(authenticateUser, orderController.updateOrder);

module.exports = router;
