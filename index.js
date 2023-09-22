const express = require('express');
require('./db')
const bodyParser=require('body-parser')
const router=require('./controllers/routes')



const app = express();
app.use(bodyParser.json())
app.use('/',router)



app.get('/', (req, res) => {
  res.send('Hello, Replit with Express!');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});