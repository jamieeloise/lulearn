const express = require('express'); 
const cors = require('cors');
const session = require('express-session'); 
// const connectDB = require('/config/db');
const userRoutes = require('./routes/users'); 
const authRoutes = require('./routes/auth'); 
const vocabRoutes = require('./routes/vocab'); 

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

// set up session 
app.use(session({
    secret: 'secret key',
    resave: false, 
    saveUninitialized: true, 
    cookie: { secure: false } // true if using https 
}));

// set up routes 
// app.use('/api/users', require('./routes/users')); 
app.use('/api/users', userRoutes); 
app.use('/api/auth', authRoutes); 
app.use('/api/vocab', vocabRoutes); 

// pulls from env variable 
app.listen(process.env.PORT || 3000, () => console.log(`Server running on port 3000`)); // default to port 3000 
