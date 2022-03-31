const { JWT_SECRET} = require('../secrets')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.headers.authorization
  const userId = req.headers.user_id
  if(!token){
    return next({
      status: 401, 
      message: "Token required"
    })
  }
  if(userId!== Number(req.params.user_id)){
    return next({
      status: 401, 
      message: "User does not have valid credentials"
    })
  }
  jwt.verify(token, JWT_SECRET, (err, decodedToken)=>{
    if(err){
      next({
        status: 401, 
        message: "Token invalid"
      })
    }
    else{
      req.decodedToken = decodedToken
      next()
    }
  })
};

