const db = require('../../data/dbConfig')

const getAll = () => {
    return db('recipes')
}

const getById = async (recipe_id) => {
    const recipeRows = await db('recipes as r')
        .join('steps as st', 'r.recipe_id', 'st.recipe_id')
        .where('r.recipe_id', recipe_id)
        .select("r.*", "st.*")
        .orderBy('st.step_number')

    const ingredientsRows = await db('recipes as r')
        .join("ingredients as ing", "r.recipe_id", "ing.recipe_id")
        .where('r.recipe_id', recipe_id)
        .select("r.*", "ing.*")
        .orderBy('ing.ingredient_id')

    const result = {
        recipe_id: recipeRows[0].recipe_id,
        recipe_name: recipeRows[0].recipe_name,
        ingredients: [],
        steps: []
    }

    recipeRows.forEach(step=>{
        if(step.step_number){
            result.steps.push({
                step_id: step.step_id,
                step_number: step.step_number,
                step_instruction: step.step_instruction
            })
        }
    })

    if (recipeRows[0].ingredient_id === null) {
        return result;
    }

    for (let ingredient of ingredientsRows) {
        result.ingredients.push({
            ingredient_id: ingredient.ingredient_id,
            ingredient_name: ingredient.ingredient_name,
            ingredient_unit: ingredient.ingredient_unit,
            quantity: ingredient.quantity
        });
    }

    return result
}

const create = async (recipe) => {
    
}

const updateById = async (id, recipe) => {
    
}
  
const deleteById = id => {
    
}

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
  }