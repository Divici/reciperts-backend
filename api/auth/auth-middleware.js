const User = require('./auth-model')

const checkUsernameFree = async (req, res, next) => {
    try {
      const users = await User.findBy({username: req.body.username})
      if(!users.length){
        next()
      }
      else{
        next({status: 400, message: "username taken"})
      }
    } 
    catch (error) {
      next(error)
    }
}

const validatePayload = (req, res, next) => {
    const { username, password } = req.body

    if(!username || !password){
        next({
            status: 401,
            message: "username and password required"
        })
    }
    else{
        next()
    }
}

const checkUsernameExists = async (req, res, next) => {
    try {
      const [user] = await User.findBy({username: req.body.username})
      if(!user){
        next({status:401, message: "invalid credentials"})
      }
      else{
        req.user = user
        next()
      }
    } 
    catch (error) {
      next(error)
    }    
  }

module.exports = {
    checkUsernameFree,
    validatePayload,
    checkUsernameExists
}