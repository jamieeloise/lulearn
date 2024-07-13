//standalone script to populate database with vocab
//can be rerun to add new scripts/languages 
require('dotenv').config(); 
const mongoose = require('mongoose'); 
const path = require('path'); 
const fs = require('fs'); 
const Vocab = require('./models/vocabWords'); 

// connect to database 
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser:true
});

// read vocab list JSON file 
const vocabList = JSON.parse(fs.readFileSync(path.join(__dirname, 'vocabList.json'), 'utf8'));

async function populateVocab(){
    try {
        await Vocab.deleteMany({}); // ensure table is empty 

        const spanish = await Vocab.insertMany(vocabList); 

        console.log(`${spanish.length} vocabulary words inserted successfully.`); 
    } catch (error) {
        console.error('Error populating vocabulary:', error); 
    } finally {
        mongoose.disconnect(); 
    }
}

populateVocab(); 