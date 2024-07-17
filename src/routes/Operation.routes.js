const { Router } = require("express")
const { getOpFromUser, deposit, withdraw, transfer } = require("../controller/Operation")

const routes = Router()

routes.get("/:id", getOpFromUser)
routes.post("/deposit", deposit)
routes.post("/withdraw", withdraw)
routes.post("/transfer", transfer)

routes.use((req, res) => {
  return res.status(200).json({
    "get all operations": {
      method: "GET",
      endpoint: "/operation/:id"
    },

    "deposit": {
      method: "POST",
      endpoint: "/operation/deposit"
    },

    "withdraw": {
      method: "POST",
      endpoint: "/operation/withdraw"
    },

    "transfer": {
      method: "POST",
      endpoint: "/operation/transfer"
    },
  })
})

module.exports = routes