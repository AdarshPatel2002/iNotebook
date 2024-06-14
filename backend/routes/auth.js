const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('../models/User')
const fetchUser = require('../middleware/fetchUser')

const JWT_SECRET = 'adarshisagoodboy$'

router.post('/createuser', [
      body('name', 'Enter valid name'),
      body('email', 'Enter valid email').isEmail(),
      body('password', 'Enter valid password')
   ],

   async (req, res) => {
      let success = false

      try {
         const errors = validationResult(req);
         if (!errors.isEmpty())
            return res.status(400).json({success, errors: errors.array()});
   
         let user = await User.findOne({email: req.body.email})
         if(user)
            return res.status(400).json({success, error: 'Sorry a user with this email already exists'})
         
         const salt = await bcrypt.genSalt(10)
         const passHash = await bcrypt.hash(req.body.password, salt)
         
         user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: passHash
         })
         
         const data = {
            user: {id: user.id}
         }

         const authtoken = jwt.sign(data, JWT_SECRET)
         success = true
         res.send({success, authtoken})
      }
      catch (error) {
         console.error(error.message)
         res.status(500).send('Internal server error')
      }
   }
)


router.post('/login', [
      body('email', 'Enter valid email').isEmail(),
      body('password', 'Enter valid password').exists()
   ],

   async (req, res) => {
      let success = false
      const errors = validationResult(req);
      const { email, password } = req.body

      if (!errors.isEmpty())
         return res.status(400).json({errors: errors.array()});

      try {
         let user = await User.findOne({email})
         if(!user) {
            success = false
            return res.status(400).json({error: 'Invalid credentials'})
         }
         
         const passwordCompare = await bcrypt.compare(password, user.password)
         if(!passwordCompare) {
            success = false
            return res.status(400).json({success, error: 'Invalid credentials'})
         }

         const data = {
            user: {id: user.id}
         }

         const authtoken = jwt.sign(data, JWT_SECRET)
         success = true;
         res.json({ success, authtoken })
      }

      catch (error) {
         console.error(error.message)
         res.status(500).send('Internal server error')
      }
   }
)


router.post('/getuser', fetchUser, async (req, res) => {
   try {
      const userId = req.user.id
      const user = await User.findById(userId).select('-password')
      res.send(user)
   }
   catch (error) {
      console.error(error.message)
      res.status(500).send('Internal server error')
   }
})

module.exports = router;