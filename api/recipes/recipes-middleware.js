const db = require('../../data/dbConfig')
const RecipesModel = require('./recipes-model')

exports.checkRecipeNameUnique = async (req, res, next) => {
    try {
      const found = await db('recipes')
        .where('recipe_name', req.body.recipe_name.trim()).first()
  
      if(found){
        res.status(400).json({message: "that recipe name is already in use"})
      }
      else{
        next()
      }  
    }
    catch (err){
      next(err)
    }
  }

exports.checkRecipeId = async (req, res, next) => {
    try{
        const recipe = await RecipesModel.getById(req.params.recipe_id)
        if(!recipe){
            res.status(404).json({message: 'recipe not found'})
        }
        else{
            req.recipe = recipe;
        next()
        }
    }
    catch (err){
        res.status(500).json({message: 'problem finding recipe'})
    }
}

exports.checkRecipePayload = (req, res, next) => {
    const error = {status: 400}
    // const {name, budget} = req.body;
    // if(name === undefined || budget === undefined){
    //   error.message ="name and budget are required"
    // }
    // else if(name.trim().length < 3 || name.trim().length > 100){
    //   error.message = "name of account must be between 3 and 100"
    // }
    // else if(typeof budget !== 'number' || isNaN(budget)){
    //   error.message = "budget of account must be a number"
    // }
    // else if(budget < 0 || budget > 1000000){
    //   error.message = "budget of account is too large or too small"
    // }
    
    // if(error.message){
    //   next(error)
    // }
    // else{
    //   req.name = name.trim()
    //   next()
    // }
  }