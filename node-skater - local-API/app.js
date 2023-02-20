// dependancies dans package --save
// devdependancies --save-dev
//npm run start demarre l'app

const express=require('express')
const morgan=require('morgan')
const favicon=require('serve-favicon')
const bodyParser=require('body-parser')
const sequelize=require('./src/db/sequelize')
// recupere la dependance express dans le fichier node module
const app=express()

const port = process.env.PORT || 3000


app
.use(favicon(__dirname+'/favicon.ico'))    
.use(morgan('dev'))
.use(bodyParser.json())

sequelize.initDb()

//Ici futurs point de terminaison
require('./src/routes/FindAllSkaters')(app)
require('./src/routes/FindSkaterByPk')(app)
require('./src/routes/CreateSkater')(app)
require('./src/routes/UpdateSkater')(app)
require('./src/routes/DeleteSkater')(app)
require('./src/routes/login')(app)

//gestion d'erreur 404
app.use(({res})=>{
    const message='Impossible de trouver la ressource demandé ! Essayez une autre URL !'
    res.status(404).json({message})
})

app.listen(port,()=>console.log(`Statut demarrage app : activé sur http://localhost:${port}`))
//5h32