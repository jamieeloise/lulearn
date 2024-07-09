const mongoose = require('mongoose'); 

const vocabSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    word: {
        type: String, 
        required: true
    },
    translation: {
        type: String,
        required: true
    },
    score: {
        type: Number, 
        default: 0
    },
    rank: {
        type: String,
        enum: ['New Word', 'Learning', 'Known', 'Well-Known', 'Mastered'],
        default: 'New Word'
    }
}); 

module.exports = mongoose.model('Vocab', vocabSchema);
