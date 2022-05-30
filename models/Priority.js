const Sequelize = require("sequelize");
const Model = Sequelize.Model;
const { db } = require("../services/postgress");
// tables
class Priority extends Model {
  static async countAll() {
    return await Priority?.findAll({});
  }
  static async add(name) {
    return await Priority.create({
      name,
    });
  }
}
Priority.init(
  {
    // attributes
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "priority",
  }
);

module.exports = { Priority };
