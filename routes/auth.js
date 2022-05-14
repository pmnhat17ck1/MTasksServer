const authController = require("../controllers/authController");
const {requestRefreshToken} = require('../middleware/requestToken')

const router = require("express").Router();
const { verifyToken } = require("../middleware/verifyToken");

//REGISTER
router.post("/register", authController.registerUser);

//REFRESH TOKEN
router.post("/refresh", requestRefreshToken);
//LOG IN
router.post("/login", authController.loginUser);
//LOG OUT
router.post("/logout", verifyToken, authController.logOut);

module.exports = router;