const taskController = require("../controllers/taskController");

const { verifyToken } = require("../middleware/verifyToken");
const { check } = require("express-validator");

const router = require("express").Router();
//ADMIN

//GET ALL step
router.get("/", verifyToken, taskController.getAll);

//CREATE step
router.post(
  "/add",
  [
    check("name").isLength({ min: 1 }).withMessage("Name not empty!"),
    check("assignee")
      .isNumeric()
      .isLength({ min: 0, max: 1 })
      .withMessage("assigneeId must be number"),
    check("reporter")
      .isNumeric()
      .isLength({ min: 0, max: 1 })
      .withMessage("reporterId must be number"),
  ],
  verifyToken,
  taskController.create
);

//UPDATE step
router.put("/:id", verifyToken, taskController.update);

//DELETE step
router.delete("/:id", verifyToken, taskController.delete);

module.exports = router;
