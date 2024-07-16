const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user'); 

router.post('/login', async (req, res) => {
  const {username, password } = req.body;

  try {
    let user = await User.findOne({ username }); 

    if (!user) {
      return res.status(400).json({ msg: 'Invalid Details'});
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ msg: 'Invalid Details'}); 
    }

    // set up a session 
    // **DEBUGGING** this was accidentally userID not userId ?? 
    // **DEBUGGING** Changing it doesn't seem to have made a difference??
    req.session.userId = user.id;

    res.json({ msg: 'Logged in successfully',
      userId: user.id
    }); 
  } catch (err) {
    console.error(err.message); 
    res.status(500).send('Server error'); 
  }
}); 


module.exports = router;
