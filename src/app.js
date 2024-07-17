const express = require("express")
const cors = require("cors")
const userRoutes = require("./routes/User.routes")
const operationRoutes = require("./routes/Operation.routes")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  return res.status(200).send("<h1>Server is ready</h1>")
})

app.use("/apii/v1/user", userRoutes)
app.use("/api/v1/operation", operationRoutes)

module.exports = app