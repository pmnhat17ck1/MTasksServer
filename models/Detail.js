const Sequelize = require("sequelize");
const Model = Sequelize.Model;
const { db } = require("../services/postgress");

// tables
class Detail extends Model {}
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
