const express = require('express');
const router = express.Router();
const Vocab = require('../models/vocabWords');

// check user is logged in 
const isLoggedIn = (req, res, next) => {
  // userID value: undefined here **DEBUGGING** 
  console.log('vocab.js userId: ', req.session.userId);
  if (req.session.userId) {
    // debugging 
    console.log('User is logged in:' , req.session.userId); 
    next(); 
  } else {
    // This is displaying because userID not defined **DEBUGGING**  
    console.log('User not authorized'); 
    res.status(401).json({ msg: 'Not authorised '});
  }
}; 

// fetch vocab list for specific user 
router.get ('/user/:userId', isLoggedIn, async (req, res) => {
  try {
    const userId = req.params.userId; 
    console.log('Fetching vocab for user: ', userId); 
    // find vocab list for specific user

    const vocabWords = await Vocab.find({ user: userId });
    // check to see if vocab words have been fetched 
    if (!vocabWords.length) { 
      console.log('No vocab list found.'); 
    }
    // print if successfully fetched 
    console.log('Vocab words found: ', vocabWords); 
    res.json(vocabWords); 
  } catch (error) {
    console.error('Error fetching vocab', error); 
    res.status(500).json({ msg: 'Server error'}); 
  }
})

// router.post('/', isLoggedIn, async (req, res) => {
//   const { word, scoreIncrease } = req.body;

//   try {
//     let vocab = await Vocab.findOne({ user: req.session.userId, spanish: word });

//     if (!vocab) {
//       return res.status(404).json({ msg: 'Word not found'}); 
//     }

//     vocabword.score +- scoreIncrease; 

//     // // update rank for word 
//     // if (vocab.score) >= 20) {
//     //   vocab.rank = 'Mastered';
//     // } else if (vocab.score >= 15) {
//     //   vocab.rank = 'Well Known';
//     // } else if (vocab.score >= 10) {
//     //   vocab.rank = 'Known'; 
//     // } else if (vocab.score >= 5) {
//     //   vocab.rank = 'Learning'; 
//     // } else if (vocab.score <=5) {
//     //   vocab.rank ='New Word'; 
//     // }

//     await vocab.save(); 

//   } 




module.exports = router;
