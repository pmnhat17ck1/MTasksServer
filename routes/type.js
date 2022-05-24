const typeController = require("../controllers/typeController");

const { verifyTokenAndAdmin, verifyToken } = require("../middleware/verifyToken");

const router = require("express").Router();
//ADMIN

//GET ALL type
router.get("/", verifyToken, typeController.getAll);

//CREATE type
router.post("/add", verifyTokenAndAdmin, typeController.create);

//UPDATE type
router.put("/:id", verifyTokenAndAdmin, typeController.update);

//DELETE type
router.delete("/:id", verifyTokenAndAdmin, typeController.delete);

module.exports = router;
