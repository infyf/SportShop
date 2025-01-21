const {DataTypes} = require(sequelize); 
const sequelize = require('C://Users//user//Desktop//DB-Server-sport//RegistrationDB.sql')
const Item = sequelize.define('Item', { 
    ID:{ 
        type: DataTypes.Number,
        allowNull: false
    }, 
    Name: { 
        type: DataTypes.STRING,
        allowNull: false
    }, 
    Email:{ 
        type: DataTypes.STRING,
        allowNull: false
    } ,
    Password:{ 
        type: DataTypes.STRING,
        allowNull: false
    },
    Count:{ 
        type: DataTypes.Number,
        allowNull: false
    }
});
module.exports = Item;
