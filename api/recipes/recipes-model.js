const db = require('../../data/dbConfig')

const getAll = () => {
    return db('recipes')
}

async function findById(recipe_id) {
    return await db('recipes').where('recipe_id', recipe_id)
}

const getById = async (recipe_id) => {
    const recipe = await db('recipes')
        .where('recipe_id', recipe_id)

    const stepsRows = await db('recipes as r')
        .join('steps as st', 'r.recipe_id', 'st.recipe_id')
        .where('r.recipe_id', recipe_id)
        .select("st.*")
        .orderBy('st.step_number')

    const ingredientsRows = await db('recipes as r')
        .join("ingredients as ing", "r.recipe_id", "ing.recipe_id")
        .where('r.recipe_id', recipe_id)
        .select( "ing.*")
        .orderBy('ing.ingredient_id')

    const result = {
        recipe: recipe,
        steps: stepsRows,
        ingredients: ingredientsRows
    }
    
    return result
}

const create = (recipe) => {
    return db('recipes').insert(recipe)
        .then(([recipe_id])=>{
            return db('recipes').where('recipe_id', recipe_id).first()
        })
}

const addIngredient = (recipe_id, ingredient) => { 
    return db('ingredients').insert({
      ...ingredient,
      recipe_id
    })
      .then(()=>{
        return db('ingredients as i')
          .join('recipes as r', 'r.recipe_id', 'i.recipe_id')
          .select('ingredient_id', 'ingredient_name', 'quantity', 'recipe_name')
          .where('r.recipe_id', recipe_id)
      })
}

const addStep = (recipe_id, step) => { 
    /*
      This function adds a step to the recipe with the given `recipe_id`
      and resolves to _all the steps_ belonging to the given `recipe_id`,
      including the newly created one.
    */
    return db('steps').insert({
      ...step,
      recipe_id
    })
      .then(()=>{
        return db('steps as st')
          .join('recipes as r', 'r.recipe_id', 'st.recipe_id')
          .select('step_id', 'step_number', 'step_instruction', 'recipe_name')
          .orderBy('step_number')
          .where('r.recipe_id', recipe_id)
      })
}

const updateById = (recipe_id, recipe) => {
    return db('recipes')
        .where('recipe_id',recipe_id)
        .update(recipe);
}
  
const deleteById = async recipe_id => {
    
    await db('recipes as r')
        .join('steps as st', 'r.recipe_id', 'st.recipe_id')
        .where('r.recipe_id', recipe_id)
        .delete("st.*");

    await db('recipes as r')
        .join("ingredients as ing", "r.recipe_id", "ing.recipe_id")
        .where('r.recipe_id', recipe_id)
        .delete( "ing.*")

    return await db('recipes')
        .where('recipe_id',recipe_id)
        .delete();
}

module.exports = {
    getAll,
    getById,
    findById,
    create,
    addIngredient,
    addStep,
    updateById,
    deleteById,
  }