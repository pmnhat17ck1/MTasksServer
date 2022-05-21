const typeController = require("../controllers/typeController");

const { verifyTokenAndAdmin } = require("../middleware/verifyToken");

const router = require("express").Router();
//ADMIN

//GET ALL type
router.get("/", verifyTokenAndAdmin, typeController.getAll);

//CREATE type
router.post("/add", verifyTokenAndAdmin, typeController.create);

//UPDATE type
router.put("/:id", verifyTokenAndAdmin, typeController.update);

//DELETE type
router.delete("/:id", verifyTokenAndAdmin, typeController.delete);

module.exports = router;
