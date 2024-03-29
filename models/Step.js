const Sequelize = require("sequelize");
const Model = Sequelize.Model;
const { db } = require("../services/postgress");
const { User } = require("./User");
// tables
class Step extends Model {
  static async countAll() {
    return await Step?.findAll({});
  }
  static async add(name, description, color) {
    return await Step.create({
      name,
      description,
      color,
    });
  }
}
Step.init(
  {
    // attributes
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    color: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "step",
  }
);

module.exports = { Step };
