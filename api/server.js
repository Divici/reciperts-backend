const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const restrict = require('./middleware/restricted.js');

const authRouter = require('./auth/auth-router.js');
const recipesRouter = require('./recipes/recipes-router');
const userRouter = require('./users/user-router')

const server = express();

const corsOptions = {
  origin: 'https://reciperts.vercel.app/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
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
