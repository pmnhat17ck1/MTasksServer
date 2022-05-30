const Sequelize = require("sequelize");
const Model = Sequelize.Model;
const { db } = require("../services/postgress");
const { User } = require("./User");
// tables
class Type extends Model {
  static async countAll() {
    return await Type?.findAll({});
  }
  static async add(name, color) {
    return await Type.create({
      name,
      color,
    });
  }
}
Type.init(
  {
    // attributes
    name: {
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
    modelName: "type",
  }
);

module.exports = { Type };
