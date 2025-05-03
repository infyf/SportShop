require('dotenv').config(); 
// create const variables, what needed 
const express = require('express'); 
const cors = require('cors'); 
const app1 = express(); 
const PORT = process.env.PORT || 5000; 
// Make cors is enable 
app1.use(cors); 
app1.get('/', (req, result) => 
{ 
    result.send('Hello from express pay system!'); 

}); 
app1.listen(PORT, () => 
{ 
    console.log(`Server is running on ${PORT} port`);
});
