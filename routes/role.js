const roleController = require("../controllers/roleController");

const { verifyTokenAndAdmin } = require("../middleware/verifyToken");

const router = require("express").Router();
//ADMIN

//GET ALL role
router.get("/", verifyTokenAndAdmin, roleController.getAll);

//CREATE role
router.post("/add", verifyTokenAndAdmin, roleController.create);

//UPDATE role
router.put("/:id", verifyTokenAndAdmin, roleController.update);

//DELETE role
router.delete("/:id", verifyTokenAndAdmin, roleController.delete);

module.exports = router;
