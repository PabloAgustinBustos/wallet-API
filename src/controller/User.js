const Account = require("../model/Account")
const User = require("../model/User")

module.exports = {
  signUp: async(req, res) => {
    const {
      name,
      email,
      password
    } = req.body
  
    try {
      const info = await Account.findOrCreate({
        where: { email },
        defaults: { email, password }
      })
      
      let isNew = info[1]

      if (!isNew) return res.status(400).json({
        status: "error",
        message: "user already exists"
      })

      const newAccount = info[0]

      await newAccount.createUser({
        name
      })
      
      return res.status(200).json({
        status: "created",
      })
    } catch (e) {
      return res.status(400).json({
        status: "error",
        errors: e
      })
    }  
  },

  signIn: async (req, res) => {
    const {
      email,
      password
    } = req.body
  
    try {
      // Buscar la cuenta
      const account = await Account.findOne({
        where: {
          email,
          password
        }
      })
  
      if (!account) return res.status(404).json({
        status: "not-found",
        message: "No se encuentra el usuario"
      })
  
      // Obtener el usuario asociado a dicha cuenta
      const user = await account.getUser()
  
      // Retornar la info del usuario
      return res.status(200).json({
        status: "found",
        user: user.dataValues
      })
    } catch (e) {
      return res.status(400).json({
        status: "error",
        errors: e
      })
    }
  },

  auth: async (req, res) => {
    const { id } = req.body

    console.log(req.body)

    try {
      const user = await User.findByPk(id)

      if (!user) return res.status(404).json({
        status: "not-found",
        message: "User not found or doesn't exist"
      })

      return res.status(200).json({
        status: "found"
      })
    } catch(e) {
      return res.status(400).json({
        status: "error",
        errors: e
      })
    }
  }
}