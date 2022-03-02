const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const restrict = require('./middleware/restricted.js');

const authRouter = require('./auth/auth-router.js');
const recipesRouter = require('./recipes/recipes-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/', (_,res)=>{
  res.json({data:"Welcome to my Recipes API"})
})

server.use('/api/auth', authRouter);
server.use('/api/recipes', recipesRouter); // add: restrict, later

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    });
});

module.exports = server;
