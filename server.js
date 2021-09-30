const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv/config');
// import routes
const authRouter = require('./routes/auth');

const app = express();

//connecting mongodb
mongoose.connect(process.env.PASSWORD
    ,()=>console.log('connected to DB'));

//General Middlewares
app.use(cors());
app.use(bodyParser.json());

//Routes Middleware
app.use('/user',authRouter);


app.listen( process.env.PORT || 7000,()=>{console.log('listening to port 7000')});