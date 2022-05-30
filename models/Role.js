const Sequelize = require("sequelize");
const Model = Sequelize.Model;
const { db } = require("../services/postgress");
// tables
class Role extends Model {
  static async countAll() {
    return await Role?.findAll({});
  }
  static async add(name) {
    return await Role.create({
      name,
    });
  }
}
Role.init(
  {
    // attributes
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "role",
  }
);

module.exports = { Role };
