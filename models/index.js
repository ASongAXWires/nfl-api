const Sequelize = require('sequelize')

const teamsModel = require('./teams')

const connection = new Sequelize('football', 'root', '112284', {
    host: 'localhost',
    dialect: 'mysql',
})

const teams = teamsModel(connection, Sequelize)

module.exports = {
    teams
}