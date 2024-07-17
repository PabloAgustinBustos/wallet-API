const { Router } = require("express")
const { signIn, signUp, auth } = require("../controller/User")

const routes = Router()

routes.post("user/auth", auth)
routes.post("user/sign-up", signUp)
routes.post("user/sign-in", signIn)

routes.use((req, res) => {
  return res.status(200).json({
    "auth": "/user/auth",
    "create user": "/user/sign-up",
    "login": "/user/sing-in"
  })
})

module.exports = routes