const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const { db } = require('../services/postgress')
// tables
class Token extends Model {}
Token.init({
    // attributes
    accessToken: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    refreshToken: {
        type: Sequelize.STRING,
        allowNull: true,
    },
}, {
    sequelize: db,
    modelName: 'token',
});


module.exports = { Token };