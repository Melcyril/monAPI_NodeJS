const { Skater } = require('../db/sequelize')
const auth=require('../auth/auth')

module.exports = (app) => {
  app.delete('/api/skaters/:id',auth, (req, res) => {
    Skater.findByPk(req.params.id).then(skater => {
        if(skater===null){
            const message='Le skater n\'existe pas. Ressayez avec un autre identifiant'
            return res.statut(404).json({message})
        }
        const skaterDeleted = skater;
        return Skater.destroy({
            where: { id: skater.id }
        })
        .then(_ => {
            const message = `Le skater avec l'identifiant n°${skaterDeleted.id} a bien été supprimé.`
            res.json({message, data: skaterDeleted })
        })
    })
    .catch(error=>{
        const message='Le skater n\'a pas pu être ajouté. Ressayez dans quelques instants.'
        res.status(500).json({message, data:error})
      })
  })
}