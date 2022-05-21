const groupController = require("../controllers/groupController");

const { verifyToken, verifyTokenAndOwnerOfGroup } = require("../middleware/verifyToken");

const router = require("express").Router();
//ADMIN

//GET ALL group
router.get("/", verifyToken, groupController.getAll);

//CREATE group
router.post("/add", verifyToken, groupController.create);

//UPDATE group
router.put("/:id", verifyTokenAndOwnerOfGroup, groupController.update);

//DELETE group
router.delete("/:id", verifyTokenAndOwnerOfGroup, groupController.delete);

module.exports = router;
