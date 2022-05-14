const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const { db } = require('../services/postgress')
const { Detail } = require('./Detail')
// tables
class User extends Model {}
User.init({
    // attributes
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    avatar: {
      type: Sequelize.BLOB,
      allowNull: true
    },
}, {
    sequelize: db,
    modelName: 'user',
});
//relationship

User.belongsTo(Detail);
Detail.hasOne(User);


module.exports = { User };