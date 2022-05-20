const userController = require("../controllers/userController");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../middleware/verifyToken");

const router = require("express").Router();
//GET ALL USERS
router.get("/", verifyToken, userController.getAllUsers);



//ADMIN
//CREATE USER
router.post("/addNew", verifyTokenAndAdmin, userController.createUser);

//UPDATE USER
router.put("/:id/update", verifyTokenAndUserAuthorization, userController.updateUser);

//DELETE USER
router.delete("/:id/delete", verifyTokenAndAdmin, userController.deleteUser);

module.exports = router;