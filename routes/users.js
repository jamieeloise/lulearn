const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const User = require('../models/user'); 

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

    await user.save(); 

    res.json({ msg: 'User registered successfully'}); 
  } catch (err) {
    console.error(err.message); 
    res.status(500).send({ msg: 'Server error' }); 
  }
}); 



module.exports = router;
