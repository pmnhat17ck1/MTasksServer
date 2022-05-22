const imageController = require("../controllers/imageController");

const {
  verifyTokenAndAdmin,
  verifyToken,
} = require("../middleware/verifyToken");

const router = require("express").Router();
//ADMIN

//GET ALL priority
router.get("/", verifyToken, imageController.getAll);

//CREATE priority
router.post("/add", verifyToken, imageController.create);

//UPDATE priority
router.put("/:id", verifyToken, imageController.update);

//DELETE priority
router.delete("/:id", verifyToken, imageController.delete);

module.exports = router;
