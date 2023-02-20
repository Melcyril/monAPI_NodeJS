const validSponsor=['Almost','Girl','Blind','Powell Peralta','Birdhouse','Flip','Zero','Element',
'Zoo York','Santa Cruz', 'Megenta','Primitive','Pizza','Globe','Quicksilver','Antiz','Alien Workshop',
'Chocolate','Cliche','Creature','speed demon','Trasher','Jart', 'Death Wish','Plan B', 'Antihero',
'Habitat','Monarch Project','Dogtown skateboard','Mini-Logo','Mob Grip','Jessup','Grizzly',
'Ricta','Bones','Bronson speed','spitfire','Independant','Thunder Truck' ,'Destucto','Venture','Tensor','Royal','ShakeJunt',
'Burton','Carhartt','DC','Emerica',
'Volcom','Redbull','Monster','Adidas','Nike sb','New Balance','Converse','Dickies','DVS',
'Sk8mafia','Huf','GoPro','Etnies','és','Lakaï','Fallen',
'supra']
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Skater', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique:{msg:'Le nom existe déjà'},
        validate:{
          notNull:{msg:'L\'indication de votre du prenom du skater est obligatoire'},
          notEmpty:{msg:'Vous devez écrire votre prenom car il ne peut être vide'}
        }
        
      },
      surname: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          notNull:{msg:'L\'indication de votre age pour skater est obligatoire'},
          isInt:{msg:'Utilsez des nombres entiers pour l\'age'},
          min:{
            args:[0],
            msg:'L\'age doit être supérieur à 0'
          },
          max:{
            args:[130],
            msg:'Vivre plus de 130 ans, vous battez facilement le record ! Veuillez essayez un entier infèrieur'
          }
        }
      },
      footed: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
        notNull:{msg:'L\'indication de votre position pour skater est obligatoire'}
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate :{
          isUrl:{msg:'Utilisez une URL valide pour l\'image'},
          notNull:{msg:'L\'URL est une donnée requise'}
        }
      },
      information: {
        type: DataTypes.STRING,
        allowNull: true
      },
      sponsor: {
        type:DataTypes.STRING,
        allowNull:true,
        get(){
          return this.getDataValue('sponsor').split(',')
        },
        set(sponsor){
          this.setDataValue('sponsor',sponsor.join())
        },
        validate: {
          isSponsorValid(value){
            if(value.split(',').lenght>5){
              throw new Error('Un skater doit avoir 5 sponsors maximum !')
            }
            value.split(',').forEach(sponsor=>{
              if(!validSponsor.includes(sponsor)){
                throw new Error(`Le sponsor doit appartenir à la liste suivante:${validSponsor}`)
              }
            })
          }
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }