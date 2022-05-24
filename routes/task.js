const taskController = require("../controllers/taskController");

const { verifyToken } = require("../middleware/verifyToken");
const { check } = require("express-validator");

const router = require("express").Router();
//ADMIN

//GET ALL step
router.get("/", verifyToken, taskController.getAll);
router.post("/taskOfGroup", [
  check("groupId")
  .isNumeric()
  .isLength({ min: 0, max: 1 })
  .withMessage("assigneeId must be number"),
] ,verifyToken, taskController.getAllTaskGroup);

//CREATE step
router.post(
  "/add",
  verifyToken,
  taskController.create
);

//UPDATE step
router.put("/:id", verifyToken, taskController.update);

//DELETE step
router.delete("/:id", verifyToken, taskController.delete);

module.exports = router;
