const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const { db } = require('../services/postgress')
const { Image } = require('./Image')
const { Type } = require('./Type')
const { Step } = require('./Step')



// tables
class Task extends Model {}
Task.init({
    // attributes
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true
    },
    reporter: {
        type: Sequelize.STRING,
        allowNull: true
      },
    assignee: {
        type: Sequelize.STRING,
        allowNull: true
    },
    link_issue: {
      type: Sequelize.STRING,
      allowNull: true
    },
    due_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
}, {
    sequelize: db,
    modelName: 'task',
});




module.exports = { Task };