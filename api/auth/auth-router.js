const router = require('express').Router();
const bcrypt = require('bcryptjs')
const tokenBuilder = require('./generateToken')
const {BCRYPT_ROUNDS} = require('../secrets')
const User = require('./auth-model')
const {checkUsernameFree, validatePayload, checkUsernameExists, validateChangePassword} = require('./auth-middleware')

router.post('/register', validatePayload, checkUsernameFree, (req, res, next) => {
  const {username, password} = req.body

  const hash = bcrypt.hashSync(password, BCRYPT_ROUNDS)
  
  User.add({username, password: hash})
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err=>{
      next(err)
    })
});

router.post('/login', validatePayload, checkUsernameExists, (req, res, next) => {
  if(bcrypt.compareSync(req.body.password, req.user.password)){
    const token = tokenBuilder(req.user)
    res.json({
      status: 200,
      message: `Welcome, ${req.user.username}`,
      token,
    })
  }
  else{
    next({
      status:401, 
      message: 'Invalid credentials'
    })
  }
});

router.put('/update', validateChangePassword, async (req, res, next) => {
  const user = req.body
  const { user_id, password } = user

  if (!password) {
    User.update(user_id, req.body)
      .then( () => {
          res.status(200).json("Changes successful")
      })
      .catch(next)
  } 
  else {
    const updates = {password: user.password}

    updates.password = bcrypt.hashSync(updates.password, BCRYPT_ROUNDS)
    
    User.update(user_id, updates)
      .then( () => {
        res.status(200).json("Changes successful")
      })
      .catch(next)
  }
})

module.exports = router;