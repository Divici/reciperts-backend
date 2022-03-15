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
  
router.get('/:recipe_id', checkRecipeId, (req, res, next) => {
    res.json(req.recipe);
})

router.post('/', checkRecipePayload, checkRecipeNameUnique, async (req, res, next) => {
    try {
        const newRecipe = await RecipesModel.create(req.body.recipe, req.body.ingredients, req.body.steps)
        res.status(201).json(newRecipe);
    }
    catch (err){
        next()
    }
})

router.put('/:recipe_id', checkRecipeId, checkRecipePayload, async (req, res, next) => {
    const updated = await RecipesModel.updateById(req.params.recipe_id, req.body)
    res.json(updated)
    next()
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