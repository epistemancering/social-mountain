let Sequelize = require("sequelize")
let sequelize = require("../util/database")
module.exports = {
    "User": sequelize.define("user", {
        "id": { "type": Sequelize.DataTypes.INTEGER, "autoIncrement": true, "allowNull": false, "primaryKey": true },
        "username": Sequelize.DataTypes.STRING,
        "hashedPass": Sequelize.DataTypes.STRING
    })
}