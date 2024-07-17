require("dotenv").config({
  path: `${__dirname}/../.env`,
})

const app = require("./app")
const Account = require("./model/Account")
const Operation = require("./model/Operation")
const User = require("./model/User")
const sequelize = require("./sequelize")
const { PORT } = require("./util")

async function bootstrap() {
  try {
    // Falta establecer relaciones entre las entidades

    sequelize.sync({alter: true}).then(() => {
      app.listen(PORT, () => console.log("server listen on port 3001"))
    })
  } catch (e) {
    console.log(e)
  }
}

bootstrap()