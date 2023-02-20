
const { Skater } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth=require('../auth/auth')

module.exports = (app) => {
  app.post('/api/skaters',auth, (req, res) => {
    Skater.create(req.body)
      .then(skater => {
        const message = `Le skater ${req.body.name} a bien été crée.`
        res.json({ message, data: skater })
      })
      .catch(error=>{
        if(error instanceof ValidationError){
            return res.status(400).json({message:error.message, data:error})
        }
        if(error instanceof UniqueConstraintError){
            return res.status(400).json({message:error.message, data:error})
        }
        const message='Le skater n\'a pas pu être ajouté. Ressayez dans quelques instants.'
        res.status(500).json({message, data:error})
      })
  })
}