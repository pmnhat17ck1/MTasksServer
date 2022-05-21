const { User, Detail } = require("../models");
const {
  jsonData,
  hashPasword,
  comparePasword,
  decodedToken,
} = require("../utils");
const { SendSMS, sendEmail } = require("../services");

const userController = {
  //DETAIL
  detail: async (req, res) => {
    try {
      if (req.params.id == req.user?.id) {
        const detailOfUser = await Detail.findOne({
          where: { id: req.user?.id },
        });
        if (!detailOfUser) {
          res.status(500).json(jsonData(false, "Detail not exist!"));
        }
        return res.status(200).json(jsonData(true, detailOfUser));
      } else {
        res.status(500).json(jsonData(false, "Wrong detail id!"));
      }
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },
  detailUpdate: async (req, res) => {
    try {
      if (req.params.id == req.user?.id) {
        const detailOfUser = await Detail.findOne({
          where: { id: req.user?.id },
        });
        if (!detailOfUser) {
          res.status(500).json(jsonData(false, "Detail not exist!"));
        }
        detailOfUser.update({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          major: req.body.major,
          cccd: req.body.cccd,
          date: req.body.date,
          description: req.body.description,
        });
        return res.status(200).json(jsonData(true, detailOfUser));
      } else {
        res.status(500).json(jsonData(false, "Wrong detail id!"));
      }
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },
  //ACTIVATION
  activation: async (req, res) => {
    try {
      // const user = req?.user
      res.status(200).json(jsonData(true));
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },
  //GET ALL USER
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["password"] },
      });
      res.status(200).json(jsonData(true, users));
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },

  //DELETE A USER
  deleteUser: async (req, res) => {
    try {
      const userfound = await User.findOne({ where: { id: req.params.id } });
      if (!userfound) {
        return res.status(500).json(jsonData(false, "User not exist!"));
      }
      userfound.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(jsonData(true, "User deleted"));
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },
  //CREATE A USER
  createUser: async (req, res) => {
    try {
      const hashed = await hashPasword(req.body.password);
      await User.create({
        username: req.body.username,
        email: req.body.email,
        phone_number: req.body.phone_number,
        password: hashed,
        roleId: req.body.roleId,
        countryId: req.body.countryId,
      });
      res.status(200).json(jsonData(true, "User created"));
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },
  //UPDATE A USER
  updateUser: async (req, res) => {
    try {
      const hashed = await hashPasword(req.body.password);
      await User.update(
        {
          email: req.body.email,
          password: hashed,
          avatar: req.body.avatar || null,
          phone_number: req.body.phone_number,
          roleId: req.body.roleId,
          countryId: req.body.countryId,
        },
        {
          where: {
            id: req.user.id,
          },
        }
      );
      res.status(200).json(jsonData(true, "User updated"));
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

module.exports = userController;
