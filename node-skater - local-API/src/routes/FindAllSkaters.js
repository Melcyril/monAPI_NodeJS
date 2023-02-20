const skaters = require('../db/mock-skater')
const { Skater } = require('../db/sequelize')
const {Op}=require('sequelize') //operateur sql
const auth=require('../auth/auth')

module.exports = (app) => {
  app.get('/api/skaters',auth, (req, res) => {
    if(req.query.name){
      const name=req.query.name
      const limit=parseInt(req.query.limit)||3

      if(name.length<2){
        const message="Votre recherche doit avoir 2 caractères minimum"
        return res.status(400).json({message})
      }
      return Skater.findAndCountAll({
        where:{
          name:{
            [Op.like]:`%${name}%`
          }
        },
        order:['name'],
        limit:limit
      })

      .then(({count, rows})=>{
          const message=`Il y a ${count} skaters qui corrrespondent au terme de recherche ${name}.`
          res.json({message, data:rows})
      })
    
  }else{
    Skater.findAll()
      .then(skaters => {
        const message = 'La liste des skateurs a bien été récupérée.'
        res.json({ message, data: skaters })
      })
      .catch(error=>{
        const message='La liste de skaters n\'a pas pu être récupérée; Ressayez dans quelques instants.'
        res.status(500).json({message, data:error})
      })
    }
  })
}