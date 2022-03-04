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
        message: "Username and Password required"
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

const validateChangePassword = async (req, res, next) => {
    const { user_id, oldPassword } = req.body 
    const [user] = await Users.findById(user_id)

    if( !oldPassword ){
        next()
    } 
    else if (user && bcrypt.compareSync(oldPassword, user.password)){
      next()
    } 
    else {
      next({ status: 401, message: 'Old password incorrect' })
    }  
}


module.exports = {
    checkUsernameFree,
    validatePayload,
    checkUsernameExists,
    validateChangePassword
}