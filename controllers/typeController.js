const { Type } = require("../models");
const { jsonData } = require("../utils");

const typeController = {
  getAll: async (req, res) => {
    try {
      const types = await Type.findAll({});
      res.status(200).json(jsonData(true, types));
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },
  delete: async (req, res) => {
    try {
      const found = await Type.findOne({ where: { id: req.params.id } });
      if (!found) {
        return res.status(500).json(jsonData(false, "Type not exist!"));
      }
      found.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(jsonData(true, "Type deleted"));
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },
  create: async (req, res) => {
    try {
      await Type.create({
        name: req.body.name,
        color: req.body.color,
      });
      res.status(200).json(jsonData(true, "Type created"));
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },
  update: async (req, res) => {
    try {
      const found = await Type.findOne({ where: { id: req.params.id } });
      if (!found) {
        return res.status(500).json(jsonData(false, "Type not exist!"));
      }
      found.update(
        {
          name: req.body.name,
          color: req.body.color,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json(jsonData(true, "Type updated"));
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },
};

module.exports = typeController;
