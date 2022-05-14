const {User, Detail} = require("../models");

const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("../middleware/generateToken");

let refreshTokens = [];

const authController = {
  //REGISTER
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      //Create new user

      const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        phone_number: req.body.phone_number,
        password: hashed,
      }); 
     await Detail.create({
        cccd: req.body.cccd,
        userId: newUser.id,
      }); 
      res.status(200).json({success: true});
    } catch (err) {
      res.status(500).json({success: false, data: err?.errors[0]?.message});
    }

  },

  //LOGIN
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        res.status(404).json("Incorrect username");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        res.status(404).json("Incorrect password");
      }
      if (user && validPassword) {
        //Generate access token
        const accessToken = generateAccessToken({id:user.id, isAdmin: user.isAdmin});
        //Generate refresh token
        const refreshToken = generateRefreshToken({id:user.id, isAdmin: user.isAdmin});
        refreshTokens.push(refreshToken);
        //STORE REFRESH TOKEN IN COOKIE
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure:false,
          path: "/",
          sameSite: "strict",
        });
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken, refreshToken });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //LOG OUT
  logOut: async (req, res) => {
    //Clear cookies when user logs out
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    res.clearCookie("refreshToken");
    res.status(200).json("Logged out successfully!");
  },
};

module.exports = authController;
