const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const User = require('../models/user'); 
const Vocab = require('../models/vocabWords');

router.post('/register', async (req, res) => {
  const { username, password } = req.body; 

  try {
    let user = await User.findOne({ username }); 

    if (user) { 
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      username,
      password
    });

    const salt = await bcrypt.genSalt(10); 
    user.password = await bcrypt.hash(password, salt); 

    //const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await user.save(); 

    // create individual vocab list for the user upon registration
    // separate lists for each user for sake of assigning points/rankings to words 
    const allVocabWords = await Vocab.find({}); 
    const userVocab = allVocabWords.map(word => ({
      user: user._id,
      word: word.word, 
      translation: word.translation,
      score: 0,
      rank: 'New Word'
    })); 
    // testing userID and user vocab generation 
    //console.log('User ID: ', user._id); 
    console.log('User Vocab: ', userVocab); 
    await Vocab.insertMany(userVocab); 

    res.json({ msg: 'User registered successfully'}); 
  } catch (err) {
    console.error(err.message); 
    res.status(500).send({ msg: 'Server error' }); 
  }
}); 

module.exports = router;
