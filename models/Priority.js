const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const { db } = require('../services/postgress')
// tables
class Priority extends Model {}
Priority.init({
    // attributes
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
}, {
    sequelize: db,
    modelName: 'priority',
});


module.exports = { Priority };