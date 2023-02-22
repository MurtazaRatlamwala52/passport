const {Sequelize, Models, DataTypes } = require('sequelize')

const  sequelize = new Sequelize('passport', 'root', 'Login123!@#',{
    host: 'localhost',
    dialect: 'mysql',
    logging: false
})

const users = require('./models/model')( sequelize, DataTypes)
sequelize.sync()
module.exports = {users}