// Craete needed variebles
const express = require('express')
const cors = require('cors')
const sequelize = require('C://Users//user//Desktop//DB-Server-sport//RegistrationDB.sql')
const Item = require('./models/Items')
//Careate app 
const app = express();
app.use(cors());
app.use(express.json())
app.get('/item', async(req, result)=> { 
    const item = await Item.findAll();
    result.json(item)
})
app.post('/item', async(req, result)=> { 
    const item = await Item.create(req.body);
    result.json(item)
})
sequelize.sync().then(() =>{
    app.listen(4500,() =>{
        console.log("The database!")
    } );
    
})
