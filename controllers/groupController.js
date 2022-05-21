const { Group } = require("../models");
const { jsonData } = require("../utils");

const stepController = {
  getAll: async (req, res) => {
    try {
      const groups = await Group.findAll({});
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
      await Group.create({
        title: req.body.title,
        sub_title: req.body.sub_title,
        icon: req.body.icon,
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
        icon: req.body.icon,
        userId: req.user.id,
      });
      res.status(200).json(jsonData(true, "Group updated"));
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },
};

module.exports = stepController;
