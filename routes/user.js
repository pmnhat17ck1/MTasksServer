const userController = require("../controllers/userController");
const { check } = require("express-validator");

const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../middleware/verifyToken");

const router = require("express").Router();
router.post("/activation", verifyToken, userController.activation);
router.get("/getCode", verifyToken, userController.getCode);
router.post("/changePassword", verifyToken, userController.changePassword);

//GET ALL USERS
router.get("/", verifyToken, userController.getAllUsers);
//noti
router.delete("/notiDeleteAll", verifyToken, userController.notificationsDeleleALL);
router.get("/noti", verifyToken, userController.notifications);
router.delete("/noti/:id", verifyToken, userController.notificationDelete);
//DETAIL
router.get("/:id/detail", verifyToken, userController.detail);
router.put(
  "/:id/detail",
  [
    check("first_name"),
    check("last_name"),
    check("date"),
    check("cccd")
      .isLength({ min: 9 })
      .withMessage("Cccd number must be at least 9 characters"),
    check("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Email must be in correct format"),
    check("phone_number")
      .isMobilePhone()
      .withMessage("Phone number must be in correct format"),
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
