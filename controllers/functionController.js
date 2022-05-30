const { User, Token } = require("../models");
const { generateRefreshToken } = require("../middleware/generateToken");
const {
  jsonData,
  hashPasword,
  decodedToken,
  codeActivation,
} = require("../utils");
const { validationResult } = require("express-validator");
const { SendSMS, sendEmail } = require("../services");

const functionController = {

  verify_otp: async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (!user) {
        return res.status(500).json(jsonData(false, "Email not exist!"));
      }
      if (!req.body.code) {
        return res.status(500).json(jsonData(false, "Code not exist!"));
      }
      const tokenOfUser = await Token.findOne({
        userId: user?.id
      })
      const codeRefreshDatabase = decodedToken(tokenOfUser?.refreshToken)?.code
      if(req.body.code !== codeRefreshDatabase) {
        return res.status(500).json(jsonData(false, "Incorect code!"));
      }
       res.status(200).json(jsonData(true, { isVerify: true }));
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },
  resetPassword: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(jsonData(false, errors.array()));
      }
      if (!req.body.password || !req.body.passwordConfirm) {
        return res
          .status(401)
          .json(jsonData(false, "Please enter password or password confirm!"));
      }
      if (req.body.password !== req.body.passwordConfirm) {
        return res
          .status(401)
          .json(
            jsonData(false, "Please enter password and password confirm right!")
          );
      }
      const userFound = await User.findOne({where: {email: req.body.email}})
      if (
        userFound?.dataValues?.password === req.body.passwordConfirm ||
        userFound?.dataValues?.password === req.body.password
      ) {
        return res
          .status(401)
          .json(jsonData(false, "Please don't be the same old password!"));
      }
      const user = req?.user;
      const hashed = await hashPasword(req.body.password);
      if (!user) {
        await userFound.update(
          {
            password: hashed,
          }
        );
        return res.status(200).json(jsonData(true));
      }
    } catch (err) {
      return res.status(500).json(jsonData(false, err));
    }
  },
  forgetPassword: async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (!user) {
        return res.status(500).json(jsonData(false, "Incorrect email"));
      }
      const refreshToken = generateRefreshToken({
        user_id: user.id,
        code: `${codeActivation}`,
      });
      const tokenOfUser = await Token.findOne({
        userId: user?.id
      })
      tokenOfUser.update({
        refreshToken: refreshToken
      })
      const code = decodedToken(refreshToken)?.code;
      res.status(200).json(jsonData(true, { refreshToken, isStart: true }));
      await sendEmail(
        user?.email,
        "forget password",
        `The code for authentication: ${code}`
      );
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },

  changePassword: async (req, res) => {
    try {
      if (!req.body.oldPassword) {
        return res
          .status(401)
          .json(jsonData(false, "Please enter old password!"));
      }
      if (!req.body.password || !req.body.passwordConfirm) {
        return res
          .status(401)
          .json(jsonData(false, "Please enter password or password confirm!"));
      }
      if (req.body.password !== req.body.passwordConfirm) {
        return res
          .status(401)
          .json(
            jsonData(false, "Please enter password and password confirm right!")
          );
      }
      if (
        req.body.oldPassword === req.body.passwordConfirm ||
        req.body.oldPassword === req.body.password
      ) {
        return res
          .status(401)
          .json(jsonData(false, "Please don't be the same old password!"));
      }
      const user = req?.user;
      const hashed = await hashPasword(req.body.password);
     if(user.password)
      if (!user) {
        await User.update(
          {
            password: hashed,
          },
          {
            where: {
              id: req.user_id,
            },
          }
        );
        return res.status(200).json(jsonData(true));
      }
    } catch (err) {
      return res.status(500).json(jsonData(false, err));
    }
  },
};

module.exports = functionController;
