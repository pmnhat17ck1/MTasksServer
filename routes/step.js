const stepController = require("../controllers/stepController");

const { verifyTokenAndAdmin, verifyToken } = require("../middleware/verifyToken");

const router = require("express").Router();
//ADMIN

//GET ALL step
router.get("/", verifyToken, stepController.getAll);

//CREATE step
router.post("/add", verifyTokenAndAdmin, stepController.create);

//UPDATE step
router.put("/:id", verifyTokenAndAdmin, stepController.update);

//DELETE step
router.delete("/:id", verifyTokenAndAdmin, stepController.delete);

module.exports = router;
