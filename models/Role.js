const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const { db } = require('../services/postgress')
// tables
class Role extends Model {}
Role.init({
    // attributes
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
}, {
    sequelize: db,
    modelName: 'role',
});


module.exports = { Role };