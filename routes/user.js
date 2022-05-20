const userController = require("../controllers/userController");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../middleware/verifyToken");

const router = require("express").Router();
//GET ALL USERS
router.get("/", verifyTokenAndAdmin, userController.getAllUsers);

//ADMIN
//CREATE USER
router.post("/add", verifyTokenAndAdmin, userController.createUser);

//UPDATE USER
router.put("/:id", verifyTokenAndUserAuthorization, userController.updateUser);

//DELETE USER
router.delete("/:id", verifyTokenAndAdmin, userController.deleteUser);

module.exports = router;
