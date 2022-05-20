const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const { db } = require('../services/postgress')
// tables
class Image extends Model {}
Image.init({
    // attributes
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    path: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: 'image',
});


module.exports = { Image };