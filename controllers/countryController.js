const { Country } = require("../models");
const { jsonData, hashPasword } = require("../utils");

const countryController = {
  getAll: async (req, res) => {
    try {
      const countries = await Country.findAll({});
      res.status(200).json(jsonData(true, countries));
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },
  delete: async (req, res) => {
    try {
      const found = await Country.findOne({ where: { id: req.params.id } });
      if (!found) {
        return res.status(500).json(jsonData(false, "Country not exist!"));
      }
      found.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(jsonData(true, "Country deleted"));
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },
  create: async (req, res) => {
    try {
      await Country.create({
        name: req.body.name,
        continent_name: req.body.continent_name,
      });
      res.status(200).json(jsonData(true, "Country created"));
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },
  update: async (req, res) => {
    try {
      const found = await Country.findOne({ where: { id: req.params.id } });
      if (!found) {
        return res.status(500).json(jsonData(false, "Country not exist!"));
      }
      found.update({
        name: req.body.name,
        continent_name: req.body.continent_name,
      });
      res.status(200).json(jsonData(true, "Country updated"));
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },
};

module.exports = countryController;
