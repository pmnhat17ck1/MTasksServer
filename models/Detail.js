const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const { db } = require('../services/postgress')

// tables
class Detail extends Model {}
Detail.init({
    // attributes
    phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: true
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
    major: {
        type: Sequelize.STRING,
        allowNull: true
      },
    cccd: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: 'detail',
});
//relationship

module.exports = { Detail };