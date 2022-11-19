const router = require("express").Router();

const userController = require("../controller/userController");
const authMiddleWare = require("../middleWares/authorization");
const doesAUserExist = require("../middleWares/isUserExist");
const checksEmptyString = require("../middleWares/emptyString");

//FOR USER CONTROLLER PATHS
router.post("/signup", checksEmptyString, userController.signUpUser);

router.post("/login", checksEmptyString, userController.loginUser);

router.put(
  "/update",
  authMiddleWare,
  doesAUserExist,
  checksEmptyString,
  userController.updateAUser
);

router.get(
  "/user/:id",
  authMiddleWare,
  doesAUserExist,
  userController.getUserById
);

router.get("/user", authMiddleWare, doesAUserExist, userController.getUserById);

router.delete(
  "/delete/:id",
  authMiddleWare,
  doesAUserExist,
  userController.deleteUserById
);

module.exports = router;
