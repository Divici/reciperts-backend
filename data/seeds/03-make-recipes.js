const recipes = [
    {recipe_name: 'Mac n Cheese', prep_time: '10 mins', cook_time: '15 mins', category: 'lunch', source: 'Uncle James', user_id: 1, ingredients: 'cheese, pasta', steps: 'cook the thing'},
    {recipe_name: 'Pasta Bulgogi', prep_time: '5 mins', cook_time: '25 mins', category: 'Pasta', source: 'Mama', user_id: 1, ingredients: 'chicken, pasta', steps: 'cook the thing in the thing'},
]

exports.seed = async function(knex) {
    await knex('recipes').insert(recipes)
};