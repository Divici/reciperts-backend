const router = require('express').Router()
const RecipesModel = require('./recipes-model')
const {checkRecipeNameUnique, checkRecipeId, checkRecipePayload} = require('./recipes-middleware')

router.get('/', (req, res, next) => {
    RecipesModel.getAll()
      .then(recipes => {
        res.json(recipes)
      })
      .catch(next)
  })
  
router.get('/:recipe_id', async (req, res, next) => {
    try {
        const recipe = await RecipesModel.getById(req.params.recipe_id)
        res.json(recipe)
    } 
    catch (err) {
        next(err)
    }
})

router.post('/', checkRecipePayload, checkRecipeNameUnique, async (req, res, next) => {
    try {
        const newRecipe = await RecipesModel.create(req.body)
        res.status(201).json(newRecipe);
    }
    catch (err){
        next()
    }
})

router.post('/:recipe_id/ingredients', (req, res, next) => {
    const ingredient = req.body
    const { recipe_id } = req.params
  
    RecipesModel.addIngredient(recipe_id, ingredient)
      .then(allIngredients => {
        res.status(201).json(allIngredients)
      })
      .catch(next)
  })

router.post('/:recipe_id/steps', (req, res, next) => {
    const step = req.body
    const { recipe_id } = req.params
  
    RecipesModel.addStep(recipe_id, step)
      .then(allSteps => {
        res.status(201).json(allSteps)
      })
      .catch(next)
  })

router.put('/:recipe_id', checkRecipePayload, async (req, res, next) => {
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

router.delete('/:recipe_id', checkRecipeId, async (req, res, next) => {
    try{
        await RecipesModel.deleteById(req.params.recipe_id)
        res.json(req.recipe)
    }
    catch(err){
        next(err)
    }
})

router.use((err, req, res, next) => { // eslint-disable-line
res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
})
})
  
module.exports = router;