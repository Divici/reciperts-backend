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
        const recipe = await RecipesModel.findById(req.params.recipe_id)
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
    
    const {recipe_name} = req.body;
    if(!recipe_name){
      error.message ="Recipe name is required"
    }

    if(error.message){
      next(error)
    }
    else{
      req.recipe_name = recipe_name.trim()
      next()
    }
  }