const mongoose = require('mongoose'); 
const User = require('./models/user'); 
const Vocab = require('./models/vocabWords'); 
require('dotenv').config(); 

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
}); 

async function deleteLists(){ 
    try {
        const allUsers = await User.find({}, `_id`); 
        const userId = allUsers.map(user => user._id);

        const tables = await Vocab.deleteMany({ user: { $nin: userId }}); 

        console.log(`Deleted ${tables.deletedCount} extra vocab entries.`); 
    } catch (err) {
        console.error('Error cleaning up extra vocab lists: ', err); 
    } finally {
        mongoose.disconnect(); 
    }
}

deleteLists(); 