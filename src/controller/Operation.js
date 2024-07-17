const Account = require("../model/Account")
const Operation = require("../model/Operation")
const User = require("../model/User")

module.exports = {
  getOpFromUser: async(req, res) => {
    const { id } = req.params
    const response = {}

    try {
      const user = await User.findByPk(id)
      
      if (!user) return res.status(404).json({
        status: "not-found",
        message: "user doesn't exists"
      })
  
      const operations = await user.getOperations({ 
        attributes: { exclude: ["UserId"] } ,
        order: [["createdAt", "DESC"]]
      })
      
      if(req.query.balance) {
        response["balance"] = user.dataValues.balance
      }

      response["operations"] = operations

      return res.status(200).json(response)
    } catch(e) {
      console.log(e)
      return res.status(400).json({
        status: "error",
        errors: e
      })
    }

  },

  deposit: async(req, res) => {
    const { id, amount, concept } = req.body

    try {
      const user = await User.findByPk(id)
      
      if (!user) return res.status(404).json({
        status: "not-found",
        message: "user doesn't exists"
      })
  
      await user.createOperation({ type: "Income", amount, concept })

      await user.increment({ balance: amount })      
  
      return res.status(200).json({
        status: "saved"
      })
    } catch(e) {
      console.log(e)
      return res.status(400).json({
        status: "error",
        errors: e
      })
    }
  },

  withdraw: async(req, res) => {
    const { id, amount, concept } = req.body

    try {
      const user = await User.findByPk(id)
      
      if (!user) return res.status(404).json({
        status: "not-found",
        message: "user doesn't exists"
      })
  
      await user.createOperation({ type: "Expense", amount, concept })

      await user.decrement({ balance: amount })      
  
      return res.status(200).json({
        status: "saved"
      })
    } catch(e) {
      console.log(e)
      return res.status(400).json({
        status: "error",
        errors: e
      })
    }
  },

  transfer: async(req, res) => {
    const {
      from,
      to,
      data  // Esto contiene el amount, concept
    } = req.body

    const {
      amount,
      concept
    } = data

    try {
      const userOrigin = await User.findByPk(from);
      const userDestination = await User.findByPk(to);

      if (!userOrigin || !userDestination) return res.status(404).json({
        status: "not-found",
        message: "One of the two users doesn't exist or cannot be found."
      })

      const op = await userDestination.createOperation({ 
        type: "Income", 
        amount, 
        concept,
        fromTo: userOrigin.name
      })
      
      await userDestination.increment({ balance: amount })

      await userOrigin.createOperation({ 
        type: "Expense", 
        amount, 
        concept, 
        fromTo: userDestination.name
      })

      await userOrigin.decrement({ balance: amount })

      return res.status(200).json({
        status: "succesfull"
      })
    } catch (e) {
      console.log(e)
      return res.status(400).json({
        status: "error",
        errors: e
      })
    }
  },
}