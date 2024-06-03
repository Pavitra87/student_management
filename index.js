const express = require('express')
const dotenv = require('dotenv');
const { connectDB } = require('./database/db');

const app = express();
dotenv.config();
connectDB();

const port = process.env.PORT;

app.use(express.json());
app.use('/api/students',require('./routes/studentRoutes'))


app.listen(port, () => {
    console.log(`server is running ${port} `)
})