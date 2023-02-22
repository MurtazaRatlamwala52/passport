// const Sequelize = require('sequelize')
const mysql = require('mysql2')


module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users',{
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        timestamps: false, 
    })
    return users
}

// sequelize.sync()