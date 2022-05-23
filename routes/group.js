const groupController = require("../controllers/groupController");

const { verifyToken, verifyTokenAndOwnerOfGroup } = require("../middleware/verifyToken");

const router = require("express").Router();
//ADMIN

//GET ALL group
router.get("/", verifyToken, groupController.getAll);
router.get("/GroupOwner", verifyToken, groupController.getGroup);

//CREATE group
router.post("/add", verifyToken, groupController.create);

//UPDATE group
router.put("/:id", verifyToken, groupController.update);

//DELETE group
router.delete("/:id", verifyToken, groupController.delete);

module.exports = router;
