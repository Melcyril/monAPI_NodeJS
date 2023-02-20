const { Skater } = require('../db/sequelize')
const auth=require('../auth/auth')
  
module.exports = (app) => {
  app.get('/api/skaters/:id',auth, (req, res) => {
    Skater.findByPk(req.params.id)
      .then(skater => {
        if(skater===null){
            const message='Le skater n\'existe pas. Ressayez avec un autre identifiant'
            return res.statut(404).json({message})
        }
        const message = 'Un skater a bien été trouvé.'
        res.json({ message, data: skater })
      })
      .catch(error=>{
        const message='La liste de skaters n\'a pas pu être récupérée; Ressayez dans quelques instants.'
        res.status(500).json({message, data:error})
      })
  })
}