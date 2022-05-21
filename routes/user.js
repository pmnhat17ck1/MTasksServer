const userController = require("../controllers/userController");
const { check } = require("express-validator");

const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../middleware/verifyToken");

const router = require("express").Router();
router.post("/activation", verifyToken, userController.activation);
router.post("/changePassword", userController.changePassword);
//GET ALL USERS
router.get("/", verifyTokenAndAdmin, userController.getAllUsers);

//DETAIL
router.get("/:id/detail", verifyToken, userController.detail);
router.put(
  "/:id/detail",
  [
    check("first_name").isEmpty().withMessage("First name not empty"),
    check("last_name").isEmpty().withMessage("Last name not empty"),
    check("date")
      .isDate()
      .withMessage("Birth is date"),
    check("cccd")
      .isLength({ min: 9 })
      .withMessage("Cccd number must be at least 9 characters"),
  ],
  verifyToken,
  userController.detailUpdate
);

//ADMIN
//CREATE USER
router.post("/add", verifyTokenAndAdmin, userController.createUser);

//UPDATE USER
router.put("/:id", verifyToken, userController.updateUser);

//DELETE USER
router.delete("/:id", verifyTokenAndAdmin, userController.deleteUser);

module.exports = router;
