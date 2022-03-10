const User = require('../users/user-model')

const checkUsernameFree = async (req, res, next) => {
  try {
    const { username } = req.body
    const user = await Users.get()   

    user.map(each => {
      if(each.username === username ) {
        next({ status: 400, message: "username taken" })
      }
    })
    next()
  } 
  catch (err) {
    next(err)
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


const validateChangePassword = async (req, res, next) => {
    const { user_id, oldPassword } = req.body 
    const [user] = await User.getById(user_id)

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
    validateChangePassword
}