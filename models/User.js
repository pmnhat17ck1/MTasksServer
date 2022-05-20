const Sequelize = require("sequelize");
const Model = Sequelize.Model;
const { db } = require("../services/postgress");
const { Detail } = require("./Detail");
const { Role } = require("./Role");
const { Country } = require("./Country");
const { Group } = require("./Group");
// tables
class User extends Model {}
User.init(
  {
    // attributes
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    avatar: {
      type: Sequelize.BLOB,
      allowNull: true,
    },
    phone_number: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: db,
    modelName: "user",
  }
);

module.exports = { User };
