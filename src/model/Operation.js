const { DataTypes, Sequelize } = require("sequelize")
const sequelize = require("../sequelize")

const Operation = sequelize.define("Operation", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4
  },

  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },

  concept: {
    type: DataTypes.STRING,
    defaultValue: ""
  },

  type: {
    type: DataTypes.ENUM(["Income", "Expense"]),
    allowNull: false
  },

  fromTo: {
    field: 'from_to',
    type: DataTypes.STRING,
    defaultValue: "-"
  }
}, {
  updatedAt: false
})

module.exports = Operation