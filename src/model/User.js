const { DataTypes, Sequelize } = require("sequelize")
const sequelize = require("../sequelize")

const User = sequelize.define("User", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isNotHyphen(value) {
        if (value === "-") {
          throw new Error("Invalid name")
        }
      }
    }
  },

  balance: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  }
}, {
  timestamps: false
})

module.exports = User