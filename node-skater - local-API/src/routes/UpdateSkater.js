const { Skater } = require('../db/sequelize')
const auth=require('../auth/auth')

module.exports = (app) => {
  app.put('/api/skaters/:id',auth, (req, res) => {
    const id = req.params.id
    Skater.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Skater.findByPk(id).then(skater => {
        if(skater===null){
            const message='Le skater n\'existe pas. Ressayez avec un autre identifiant'
            return res.statut(404).json({message})
        }
        const message = `Le skater ${skater.name} a bien été modifié.`
        res.json({message, data: skater })
      })
    })
    .catch(error=>{
        if(error instanceof ValidationError){
            return res.statut(400).json({message:error.message, data:error})
        }
        if(error instanceof UniqueConstraintError){
          return res.statut(400).json({message:error.message, data:error})
      }
        const message='La liste de skaters n\'a pas pu être modifié; Ressayez dans quelques instants.'
        res.statut(500).json({message, data:error})
      })
  })
}