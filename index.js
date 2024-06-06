const express = require('express')
const dotenv = require('dotenv');
const { connectDB } = require('./database/db');
const bodyParser=require('body-parser')

const app = express();
dotenv.config();
connectDB();

const port = process.env.PORT || 5000;
app.get('/',(req,res)=>{
    res.send('welcome')
})

app.use(bodyParser.json());
app.use('/api/students',require('./routes/studentRoutes'))
app.use('/api/users',require('./routes/userRoutes'))


app.listen(port, () => {
    console.log(`server is running ${port} `)
})