const {DataTypes} = require(sequelize); 
const sequelize = require('C://Users//user//Desktop//DB-Server-sport//SportThings1.sql')
const Item = sequelize.define('Item', { 
    name:{ 
        type: DataTypes.STRING,
        allowNull: false
    }, 
    price: { 
        type: DataTypes.FLOAT,
        allowNull: false
    }
});
module.exports = Item;
