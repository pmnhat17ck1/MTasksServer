const Sequelize = require("sequelize");
const Model = Sequelize.Model;
const { db } = require("../services/postgress");
// tables
class Country extends Model {
  static async countAll() {
    return await Country?.findAll({});
  }
  static async add(name, continent_name) {
    return await Country.create({
      name,
      continent_name,
    });
  }
}
Country.init(
  {
    // attributes
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    continent_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "country",
  }
);

module.exports = { Country };
