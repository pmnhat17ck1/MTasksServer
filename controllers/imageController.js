const { Image } = require("../models");
const { jsonData } = require("../utils");

const imageController = {
  getAll: async (req, res) => {
    try {
      const images = await Image.findAll({});
      res.status(200).json(jsonData(true, images));
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },
  delete: async (req, res) => {
    try {
      const found = await Image.findOne({ where: { id: req.params.id } });
      if (!found) {
        return res.status(500).json(jsonData(false, "Image not exist!"));
      }
      found.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(jsonData(true, "Image deleted"));
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },
  create: async (req, res) => {
    try {
      await Image.create({
        name: req.body.name,
        path: req.body.path,
      });
      res.status(200).json(jsonData(true, "Image created"));
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },
  update: async (req, res) => {
    try {
      const found = await Image.findOne({ where: { id: req.params.id } });
      if (!found) {
        return res.status(500).json(jsonData(false, "Image not exist!"));
      }
      found.update({
        name: req.body.name,
      });
      res.status(200).json(jsonData(true, "Image updated"));
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },
};

module.exports = imageController;
