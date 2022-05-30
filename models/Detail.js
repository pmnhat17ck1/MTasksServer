const Sequelize = require("sequelize");
const Model = Sequelize.Model;
const { db } = require("../services/postgress");

// tables
class Detail extends Model {
  static async countAll() {
    return await Detail?.findAll({});
  }
  static async add(userId, first_name, last_name, major, cccd, date, description) {
    return await Detail.create({
      userId,
      first_name,
      last_name,
      major,
      cccd,
      date,
      description,
    });
  }
}
Detail.init(
  {
    // attributes
    first_name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    major: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    cccd: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: "detail",
  }
);
//relationship

module.exports = { Detail };
