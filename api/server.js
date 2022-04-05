const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const restrict = require('./middleware/restricted.js');

const authRouter = require('./auth/auth-router.js');
const recipesRouter = require('./recipes/recipes-router');
const userRouter = require('./users/user-router')

const server = express();

const whitelist = ['https://reciperts.vercel.app', 'http://localhost:3000', 'http://localhost:9000']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

server.use(helmet());
server.use(cors(corsOptions));
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/recipes', recipesRouter);
server.use('/api/users', userRouter)

server.use('/api/', (_,res)=>{
  res.json({data:"Welcome to my Recipes API"})
})

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    });
});

module.exports = server;
