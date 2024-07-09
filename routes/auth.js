const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user'); 


// Define your routes here
//router.get('/', (req, res) => {
 // res.send('Auth route');
//});

router.post('/login', async (req, res) => {
  const {username, password } = req.body;

  try {
    let user = await User.findOne({ username }); 

    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials'});
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ msg: 'Invalid Credentials'}); 
    }

    // set up a session 
    req.session.userID = user.id;

    res.json({ msg: 'Logged in successfully'}); 
  } catch (err) {
    console.error(err.message); 
    res.status(500).send('Server error'); 
  }
}); 


module.exports = router;
