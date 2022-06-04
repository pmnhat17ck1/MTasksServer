const { User, Token, Task, Step, Priority, Type } = require("../models");
const { generateRefreshToken } = require("../middleware/generateToken");
const {
  jsonData,
  hashPasword,
  decodedToken,
  generateActivationCode,
  checkExpiredToken,
} = require("../utils");
const { validationResult } = require("express-validator");
const { SendSMS, sendEmail } = require("../services");

const functionController = {
  dashboard: async (req, res) => {
    try {
      const types = await Type.countAll();
      const steps = await Step.countAll();
      const priorities = await Priority.countAll();
      const tasks = await Task.countAll();
      const users = await User.countAll();
      res
        .status(200)
        .json(jsonData(true, { types, steps, priorities, tasks, users }));
    } catch (error) {
      res.status(500).json(jsonData(false, err));
    }
  },
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
        where: {
          userId: user?.id,
        },
        raw: true,
      });
      const codeRefreshDatabase = decodedToken(tokenOfUser?.refreshToken);
      if (req.body.code !== codeRefreshDatabase?.code) {
        return res.status(500).json(jsonData(false, "Incorect code!"));
      }
      const refreshExp = codeRefreshDatabase?.exp;
      const refreshExpired = checkExpiredToken(refreshExp);
      if (refreshExpired) {
        return res
          .status(500)
          .json(jsonData(false, "Refresh token was expired!"));
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
      const userFound = await User.findOne({
        where: { email: req.body.email },
      });
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
        await userFound.update({
          password: hashed,
        });
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
      const codeActivation = generateActivationCode();

      const refreshToken = generateRefreshToken({
        user_id: user.id,
        code: `${codeActivation}`,
      });
      const tokenOfUser = await Token.findOne({
        where: { userId: user?.id },
      });

      await tokenOfUser.update({
        refreshToken: refreshToken,
      });
      await tokenOfUser.save();

      res.status(200).json(jsonData(true, { refreshToken, isStart: true }));
      await sendEmail(
        user?.email,
        "forget password",
        `The code for authentication: ${codeActivation}`
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
      if (user.password)
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
