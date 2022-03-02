const recipes = [
    {recipe_name: 'Mac n Cheese', prep_time: 10, cook_time: 30, category: 'lunch', source: 'Uncle James'},
    {recipe_name: 'Pasta Bulgogi', prep_time: 15, cook_time: 20, category: 'Pasta', source: 'Mama'},
    {recipe_name: 'Chicken Curry', prep_time: 20, cook_time: 40, category: 'Dinner', source: 'Papa'},
]

const ingredients = [
    {ingredient_name: 'Cheese', ingredient_unit: 'lbs', quantity: 2, recipe_id: 1},
    {ingredient_name: 'Chicken', ingredient_unit: 'ozs', quantity: 8, recipe_id: 3},
    {ingredient_name: 'Soy Sauce', ingredient_unit: 'ozs', quantity: 7, recipe_id: 2},
    {ingredient_name: 'Pasta', ingredient_unit: 'lbs', quantity: 6, recipe_id: 2},
    {ingredient_name: 'Broccoli', ingredient_unit: 'grams', quantity: 5, recipe_id: 3},
    {ingredient_name: 'Peppers', ingredient_unit: 'grams', quantity: 4, recipe_id: 3},
]

const steps = [
    // Mac n Cheese
    {step_instruction: 'Heat saucepan', step_number: 1, recipe_id: 1},
    {step_instruction: 'Make the cheese sauce', step_number: 2, recipe_id: 1},
    {step_instruction: 'Mix Pasta with the cheese sauce and peppers', step_number: 3, recipe_id: 1},
    // Pasta Bulgogi
    {step_instruction: 'Heat up grill', step_number: 1, recipe_id: 2},
    {step_instruction: 'cook chicken strips to perfection', step_number: 2, recipe_id: 2},
    {step_instruction: 'Add soy sauce and mix with pasta in bowl', step_number: 3, recipe_id: 2},
    // Chicken Curry
    {step_instruction: 'Prepare curry on side', step_number: 1, recipe_id: 3},
    {step_instruction: 'cook pasta and set aside', step_number: 2, recipe_id: 3},
    {step_instruction: 'cook chicken', step_number: 3, recipe_id: 3},
    {step_instruction: 'mix meat into sauce and pasta', step_number: 4, recipe_id: 3},
]

exports.seed = async function(knex) {
    await knex('recipes').insert(recipes)
    await knex('ingredients').insert(ingredients)
    await knex('steps').insert(steps)
};