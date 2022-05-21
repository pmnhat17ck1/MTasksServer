const { Step } = require("../models");
const { jsonData } = require("../utils");

const stepController = {
  getAll: async (req, res) => {
    try {
      const steps = await Step.findAll({});
      res.status(200).json(jsonData(true, steps));
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },
  delete: async (req, res) => {
    try {
      const found = await Step.findOne({ where: { id: req.params.id } });
      if (!found) {
        return res.status(500).json(jsonData(false, "Step not exist!"));
      }
      found.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(jsonData(true, "Step deleted"));
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },
  create: async (req, res) => {
    try {
      await Step.create({
        name: req.body.name,
        description: req.body.description,
        color: req.body.color,
      });
      res.status(200).json(jsonData(true, "Step created"));
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },
  update: async (req, res) => {
    try {
      const found = await Step.findOne({ where: { id: req.params.id } });
      if (!found) {
        return res.status(500).json(jsonData(false, "Step not exist!"));
      }
      found.update(
        {
          name: req.body.name,
          description: req.body.description,
          color: req.body.color,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json(jsonData(true, "Step updated"));
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },
};

module.exports = stepController;
