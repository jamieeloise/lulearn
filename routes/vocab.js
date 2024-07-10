const express = require('express');
const router = express.Router();
//const Vocab = require('..models/Vocab');
//const VocabList = require('../models/vocabList');

// check user is logged in 
const isLoggedIn = (req, res, next) => {
  if (req.session.userID) {
    next(); 
  } else {
    req.status(401).json({ msg: 'Not authorised '});
  }
}; 

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
