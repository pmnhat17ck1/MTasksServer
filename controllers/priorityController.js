const { Priority } = require("../models");
const { jsonData } = require("../utils");

const priorityController = {
  getAll: async (req, res) => {
    try {
      const priorities = await Priority.findAll({});
      res.status(200).json(jsonData(true, priorities));
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },
  delete: async (req, res) => {
    try {
      const found = await Priority.findOne({ where: { id: req.params.id } });
      if (!found) {
        return res.status(500).json(jsonData(false, "Priority not exist!"));
      }
      found.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(jsonData(true, "Priority deleted"));
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },
  create: async (req, res) => {
    try {
      await Priority.create({
        name: req.body.name,
      });
      res.status(200).json(jsonData(true, "Priority created"));
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },
  update: async (req, res) => {
    try {
      const found = await Priority.findOne({ where: { id: req.params.id } });
      if (!found) {
        return res.status(500).json(jsonData(false, "Priority not exist!"));
      }
      found.update({
        name: req.body.name,
      });
      res.status(200).json(jsonData(true, "Priority updated"));
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },
};

module.exports = priorityController;
