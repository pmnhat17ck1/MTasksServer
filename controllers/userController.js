const { User } = require("../models");
const bcrypt = require("bcrypt");

const userController = {
  //GET ALL USER
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["password"] },
      });
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE A USER
  deleteUser: async (req, res) => {
    try {
      await User.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json("User deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //CREATE A USER
  createUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      await User.create({
        username: req.body.username,
        email: req.body.email,
        phone_number: req.body.phone_number,
        password: hashed,
        roleId: req.body.roleId,
        countryId: req.body.countryId,
      });
      res.status(200).json("User created");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //UPDATE A USER
  updateUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

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
      res.status(200).json("User updated");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  forgetPassword: async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          email: req.params.email,
        },
      });
      if (!user) {
        return res.json({ success: false, data: "Incorrect email" });
      }
      res.status(200).json("Find password success");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
