const {User, Detail, Token} = require("../models");
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("../middleware/generateToken");
let refreshTokens = [];
const { validationResult } = require('express-validator');

const authController = {
  //REGISTER
  registerUser: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors:  errors.array() });
      }
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      //Create new user
      const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        phone_number: req.body.phone_number,
        password: hashed,
        roleId: 2,
        countryId: 1,
      }); 
     await Detail.create({
        cccd: req.body.cccd,
        userId: newUser.id,
      }); 
     await Token.create({
        userId: newUser.id,
      }); 
      res.status(200).json({success: true});
    } catch (err) {
      res.status(500).json({success: false});
    }

  },

  //LOGIN
  loginUser: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors:  errors.array() });
      }
      const username = req.body.username
      const user = await User.findOne({ where: {
        username, 
      }});
      if (!user) {
        return res.status(404).json({success: false, data: "Incorrect username"});
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(404).json({success: false, data: "Incorrect password"});
      }
      if (user && validPassword) {
        //Generate access token
        const accessToken = await generateAccessToken({id:user.id});
 
        //Generate refresh token
        const refreshToken = await generateRefreshToken({id:user.id});
 
        refreshTokens.push(refreshToken);
        //STORE REFRESH TOKEN IN COOKIE
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure:false,
          path: "/",
          sameSite: "strict",
        });
        return res.status(200).json({ success: true, data: {...user?.dataValues, password: null, accessToken, refreshToken} });
      }
    } catch (error) {
      return res.status(500).json({success: false});
    }
  },

  //LOG OUT
  logOut: async (req, res) => {
    //Clear cookies when user logs out
    // refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    res.clearCookie("refreshToken");
    res.status(200).json("Logged out successfully!");
  },
};

module.exports = authController;
