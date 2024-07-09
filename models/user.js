const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true, 
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}); 

module.exports = mongoose.model('User', userSchema) 
// 'User' = name of the table inside db 
// userSchema passes the schema that defines the table 