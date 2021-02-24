const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// @route    GET api/auth
// @desc     Get logged in user
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({
      status: 'success',
      data: {
        user: user
      }
    })
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error!'});
  }
});

// @route    POST api/auth
// @desc     Auth user and get token
// @access   Public
router.post('/', 
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
const { email, password } = req.body;

try {
  let user = await User.findOne({ email });

  if(!user) {
    return res.status(400).json({ msg: 'Email or password not matching' })
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ msg: 'Email or password not matching'});
  }

  // Issue token
  const payload = {
    user: {
      id: user.id
    }
  }
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  }, (err, token) => {
    if (err) throw err;
    res.json({ token })
  });

} catch (err) {
  console.error(err.message);
    res.status(500).json({ msg: 'Server Error'});
}

});


module.exports = router;