const { DataTypes, Sequelize } = require("sequelize")
const sequelize = require("../sequelize")

const Account = sequelize.define("Account", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4
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
    allowNull: false,
  }
}, {
  timestamps: false
})

module.exports = Account