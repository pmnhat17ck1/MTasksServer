const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const { db } = require('../services/postgress')
// tables
class Country extends Model {}
Country.init({
    // attributes
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    continent_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: 'country',
});


module.exports = { Country };