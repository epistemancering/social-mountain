let Sequelize = require("sequelize")
let sequelize = require("../util/database")
module.exports = sequelize.define("post", {
    "privateStatus": Sequelize.DataTypes.BOOLEAN,
    "userId": Sequelize.DataTypes.INTEGER,
    "title": Sequelize.DataTypes.TEXT,
    "content": Sequelize.DataTypes.TEXT
})