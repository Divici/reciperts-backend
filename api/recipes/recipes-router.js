const router = require('express').Router()
const RecipesModel = require('./recipes-model')
const restrict = require('../middleware/restricted')
const {checkRecipeNameUnique, checkRecipeId, checkRecipePayload} = require('./recipes-middleware')

router.get('/', async (req, res, next) => {
    //res.json({message: "Welcome. Please sign in"})
    try {
        const recipes = await RecipesModel.getAll()
        res.status(200).json(recipes)
      } 
    catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'An error occurred while trying to retrieve recipes'
        })
      }
  })
  
router.get('/:recipe_id', async (req, res, next) => {
    try {
        const recipe = await RecipesModel.getById(req.params.recipe_id)
        if (recipe) {
            res.status(200).json(recipe)
        } 
        else {
            res.status(404).json({ message: 'Cannot find requested recipe' });
        }
    } 
    catch (err) {
        //next(err)
        res.status(500).json({message: 'The recipe could not be retrieved.'})
    }
})

router.post('/', async (req, res, next) => {
    try {
        const newRecipe = await RecipesModel.create(req.body)
        res.status(201).json(newRecipe);
    }
    catch (err){
        next(err)
    }
})

router.put('/:recipe_id', restrict, checkRecipePayload, async (req, res, next) => {
    try{
        const updated = await RecipesModel.updateById(req.params.recipe_id, req.body)
        if (updated) {
            res.status(200).json(updated)
        } 
        else {
            res.status(404).json({ message: 'That recipe does not exist'})
        }
    }
    catch (error){
        //next(err)
        res.status(500).json({ message: 'There was an error while trying to update the recipe'})
    }
 
});

router.delete('/:recipe_id', restrict, checkRecipeId, async (req, res, next) => {
    try{
        const count = await RecipesModel.deleteById(req.params.recipe_id)
        if (count > 0) {
            res.status(204).end();
        } 
        else {
            res.status(404).json({ message: 'Recipe deleted'})
        }
    } 
    catch (error) {
        res.status(500).json({ message: 'There was an error while attempting to remove that recipe'})
    }
})

router.use((err, req, res, next) => { // eslint-disable-line
res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
})
})
  
module.exports = router;