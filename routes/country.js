const countryController = require("../controllers/countryController");

const { verifyTokenAndAdmin } = require("../middleware/verifyToken");

const router = require("express").Router();
//ADMIN

//GET ALL COUNTRY
router.get("/", verifyTokenAndAdmin, countryController.getAll);

//CREATE COUNTRY
router.post("/add", verifyTokenAndAdmin, countryController.create);

//UPDATE COUNTRY
router.put("/:id", verifyTokenAndAdmin, countryController.update);

//DELETE COUNTRY
router.delete("/:id", verifyTokenAndAdmin, countryController.delete);

module.exports = router;
