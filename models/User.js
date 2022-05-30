const Sequelize = require("sequelize");
const Model = Sequelize.Model;
const { db } = require("../services/postgress");
const { Detail } = require("./Detail");
const { Role } = require("./Role");
const { Country } = require("./Country");
const { Group } = require("./Group");
// tables
class User extends Model {
  static async countAll() {
    return await User?.findAll({});
  }
  static async add(
    username,
    password,
    phone_number,
    email,
    isActive,
    countryId,
    roleId
  ) {
    return await User.create({
      username,
      password,
      phone_number,
      email,
      isActive,
      countryId,
      roleId,
    });
  }
}
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
    isActive: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
    modelName: "user",
  }
);

module.exports = { User };
