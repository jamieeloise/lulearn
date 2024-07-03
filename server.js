const express = require('express'); 
const cors = require('cors');
require('dotenv').config(); 

const app = express(); 

// set up middleware 
app.use(cors()); 
app.use(express.json()); 

// set up mongodb connection 
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true }) // might not need to set this to true anymore 
const db = mongoose.connection 
db.on('error', error => console.error(error)) 
db.once('open', () => console.log("Connected to Mongoose")) // runs once on opening 

// set up routes 
app.use('/api/users', require('./routes/users')); 
app.use('/api/auth', require('./routes/auth')); 
app.use('/api/vocab', require('./routes/vocab')); 

// pulls from env variable 
app.listen(process.env.PORT || 3000) // default to port 3000 