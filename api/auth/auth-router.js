const router = require('express').Router();
const bcrypt = require('bcryptjs')
const tokenBuilder = require('./generateToken')
const User = require('./auth-model')
const {checkUsernameFree, validatePayload, checkUsernameExists} = require('./auth-middleware')

router.post('/register', validatePayload, checkUsernameFree, (req, res, next) => {
  const {username, password} = req.body

  const hash = bcrypt.hashSync(password, 8)
  
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
      message: `welcome, ${req.user.username}`,
      token,
    })
  }
  else{
    next({
      status:401, 
      message: 'invalid credentials'
    })
  }
});

module.exports = router;