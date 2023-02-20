const {Sequelize, DataTypes} =require('sequelize')
const SkaterModel=require('../models/skater')
const UserModel=require('../models/user')
let skaters=require('./mock-skater')
const bcrypt=require('bcrypt')

const sequelize= new Sequelize('rider','root','',
{
    host:'127.0.0.1',
    dialect:'mariadb',
    dialectOption:{
        timezone:'Etc/GMT-2'
    },
    port:'3307'
}
)
//utilisation du port 3307 pour phpmyadmin 
//Sequelise authentification pour se connecter à la bdd

const Skater=SkaterModel(sequelize,DataTypes)
const User=UserModel(sequelize,DataTypes)

const initDb=()=>{
    return sequelize.sync({force:true}).then(_ => {
    skaters.map(skater=>{
        //recherche des donnée du mock-skater.js pour la BDD
        Skater.create({name:skater.name,
                surname:skater.surname,
                age:skater.age,
                footed:skater.footed,
                picture:skater.picture,
                information:skater.information,
                sponsor:skater.sponsor
                }).then(skater=>console.log(skater.toJSON()))
    })
    bcrypt.hash('dieu',10)
    .then(hash=>User.create({username:'dieu',password:hash}))
    .then(user=>console.log(user.toJSON()))

    console.log('La base de donnée a été initialisée')
    })
}
    //Mapping des données enregistrer dans le mock      
module.exports={initDb,Skater,User}