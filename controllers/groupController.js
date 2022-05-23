const { Group } = require("../models");
const { jsonData } = require("../utils");

const groupController = {
  getAll: async (req, res) => {
    try {
      const groups = await Group.findAll({ order: [["createdAt", "DESC"]] });
      res.status(200).json(jsonData(true, groups));
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },
  getGroup: async (req, res) => {
    try {
      const groups = await Group.findAll({
        order: [["createdAt", "DESC"]],
        where: { isOwner: true, userId: req.user.id },
      });
      res.status(200).json(jsonData(true, groups));
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },
  delete: async (req, res) => {
    try {
      const found = await Group.findOne({ where: { id: req.params.id } });
      if (!found) {
        return res.status(500).json(jsonData(false, "Group not exist!"));
      }
      found.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(jsonData(true, "Group deleted"));
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },
  create: async (req, res) => {
    try {
      if (!req.user.id) {
        return res.status(500).json(jsonData(false, "User id not exist!"));
      }
      console.log("444444444", "voday");
      await Group.create({
        title: req.body.title,
        sub_title: req.body.sub_title,
        isOwner: true,
        userId: req.user.id,
      });
      res.status(200).json(jsonData(true, "Group created"));
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },
  update: async (req, res) => {
    try {
      const found = await Group.findOne({ where: { id: req.params.id } });
      if (!found) {
        return res.status(500).json(jsonData(false, "Group not exist!"));
      }
      found.update({
        title: req.body.title,
        sub_title: req.body.sub_title,
      });
      res.status(200).json(jsonData(true, found?.dataValues));
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },
};

module.exports = groupController;
