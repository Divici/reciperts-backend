const db = require('../../data/dbConfig')

const getAll = () => {
    return db('recipes')
        .select('*')
}

async function findById(recipe_id) {
    return await db('recipes').where('recipe_id', recipe_id)
}

const getById = async (recipe_id) => {
    return await db('recipes')
        .where('recipe_id', recipe_id)
}

const create = async (recipe) => {
    await db('recipes').insert(recipe)
    return recipe
}

const updateById = (recipe_id, recipe) => {
    return db('recipes')
        .where('recipe_id',recipe_id)
        .update(recipe);
}
  
const deleteById = async recipe_id => {

    return await db('recipes')
        .where('recipe_id',recipe_id)
        .delete();
}

module.exports = {
    getAll,
    getById,
    findById,
    create,
    updateById,
    deleteById,
  }