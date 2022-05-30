const Sequelize = require("sequelize");
const Model = Sequelize.Model;
const { db } = require("../services/postgress");

// tables
class Group extends Model {}
Group.init(
  {
    // attributes
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sub_title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    icon: {
      type: Sequelize.BLOB,
      allowNull: true,
    },
    isOwner: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: "group",
  }
);

module.exports = { Group };
