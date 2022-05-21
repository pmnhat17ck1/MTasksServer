const { User, Detail, Token } = require("../models");
const { jsonData, hashPasword, comparePasword } = require("../utils");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middleware/generateToken");
const { validationResult } = require("express-validator");
const { SendSMS, sendEmail } = require("../services");
const { userRes, decodedToken, checkExpiredToken } = require("../utils");

const authController = {
  //REGISTER
  registerUser: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(jsonData(false, errors.array()));
      }
      const passwordHash = await hashPasword(req.body.password);
      //Create new user
      const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        phone_number: req.body.phone_number,
        password: passwordHash,
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
      //Generate access token
      const accessToken = await generateAccessToken({ user_id: newUser.id });

      //Generate refresh token
      const refreshToken = await generateRefreshToken(
        { user_id: newUser.id },
        "2h"
      );

      if (accessToken && refreshToken) {
        //find token to update
        const tokenById = await Token.findOne({
          where: {
            userId: newUser.id,
          },
        });
        tokenById &&
          tokenById.update({
            accessToken,
            refreshToken,
          });
        tokenById.save();
      }
      res.status(200).json(jsonData(true, "register success!"));
      await sendEmail(newUser.email, "Register mtask", `register success!`);
    } catch (err) {
      res.status(500).json(jsonData(false, err?.errors[0]?.message));
    }
  },

  //LOGIN
  loginUser: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(jsonData(false, errors.array()));
      }
      const username = req.body.username;
      const user = await User.findOne({
        where: {
          username,
        },
      });
      if (!user) {
        return res.status(404).json(jsonData(false, "Incorrect username"));
      }
      const validPassword = await comparePasword(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(404).json(jsonData(false, "Incorrect password"));
      }

      if (user && validPassword) {
        //Generate access token
        const accessToken = await generateAccessToken({ user_id: user.id });

        //Generate refresh token
        const refreshToken = await generateRefreshToken(
          { user_id: user.id },

        );

        //find token to update
        const tokenById = await Token.findOne({
          where: {
            userId: user.id,
          },
        });
        if (tokenById) {
          const expAccess = decodedToken(tokenById?.accessToken)?.exp;
          const expRefresh = decodedToken(tokenById?.refreshToken)?.exp;
          const expiredAccess = checkExpiredToken(expAccess);
          const expiredRefresh = checkExpiredToken(expRefresh);
          if (expiredAccess)
            tokenById.update({
              accessToken,
            });
          if (expiredRefresh)
            tokenById.update({
              refreshToken,
            });
        }
        tokenById.save();

        //STORE REFRESH TOKEN IN COOKIE
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        const userNew = userRes(user?.dataValues);
        return res.status(200).json(
          jsonData(true, {
            ...userNew,
            accessToken: tokenById?.accessToken,
            refreshToken: tokenById?.refreshToken,
          })
        );
      }
    } catch (error) {
      return res.status(500).json(jsonData(false, error));
    }
  },

  //LOG OUT
  logOut: async (req, res) => {
    //Clear cookies when user logs out
    // refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    res.clearCookie("refreshToken");
    res.status(200).json(jsonData(true, "Logged out successfully!"));
  },
};

module.exports = authController;
