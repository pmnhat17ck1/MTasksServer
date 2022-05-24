const priorityController = require("../controllers/priorityController");

const { verifyTokenAndAdmin, verifyToken } = require("../middleware/verifyToken");

const router = require("express").Router();
//ADMIN

//GET ALL priority
router.get("/", verifyToken, priorityController.getAll);

//CREATE priority
router.post("/add", verifyTokenAndAdmin, priorityController.create);

//UPDATE priority
router.put("/:id", verifyTokenAndAdmin, priorityController.update);

//DELETE priority
router.delete("/:id", verifyTokenAndAdmin, priorityController.delete);

module.exports = router;
