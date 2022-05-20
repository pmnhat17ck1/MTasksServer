const authController = require("../controllers/authController");
const {verifyToken, requestToken} = require('../middleware')
const { check } = require('express-validator');
const router = require("express").Router();

//REGISTER
router.post("/register", 
[
    check('username').isLength({ min: 8 })
    .withMessage("Username must be at least 8 characters"),
    check('email').isEmail().normalizeEmail()
    .withMessage("Email must be in correct format"),
    check('password').isLength({ min: 8 })
    .withMessage("Password must be greater than 8"),
    check('phone_number').isMobilePhone()
    .withMessage("Phone number must be in correct format"),
    check('cccd').isLength({ min: 9 })
    .withMessage("Cccd number must be at least 9 characters")
],
authController.registerUser);

//REFRESH TOKEN
router.post("/refresh", requestToken.requestRefreshToken);
//LOG IN
router.post("/login", 
[
    check('username').isLength({ min: 8 }).withMessage("Username must be at least 8 characters"),
    check('password').isLength({ min: 8 }).withMessage("Password must be greater than 8"),
],
authController.loginUser);
//LOG OUT
router.post("/logout", verifyToken.verifyToken, authController.logOut);

module.exports = router;