const router = require('express').Router();
const bcrypt = require('bcryptjs')
const tokenBuilder = require('./generateToken')
const {BCRYPT_ROUNDS} = require('../secrets')
const User = require('../users/user-model')
const {checkUsernameFree, validatePayload, validateChangePassword} = require('./auth-middleware')

router.post('/register', validatePayload, checkUsernameFree, async (req, res, next) => {
  try {
    const { username, password } = req.body

    const hash = bcrypt.hashSync(password, BCRYPT_ROUNDS)
    const newUser = { ...req.body, password: hash }

    await User.create(newUser)
    res.status(201).json(`Welcome, ${username}`)
  } 
  catch (err) {
      next(err)
  }
});

router.post('/login', validatePayload, async (req, res, next) => {
  try {
    const { username, password } = req.body
    const [user] = await User.getBy({ username })

    if(user && bcrypt.compareSync(password, user.password)){
      const token = tokenBuilder(user)
      res.json({ message: `Welcome, ${user.username}`, token, user_id: user.user_id })
    } 
    else {
      next({ status: 401, message: 'Invalid credentials' })
    }
  } 
  catch (err) {
    next(err)
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