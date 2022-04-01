const db = require('../../data/dbConfig')

const getAll = () => {
    return db('recipes')
}

async function findById(recipe_id) {
    return await db('recipes').where('recipe_id', recipe_id)
}

const getById = async (recipe_id) => {
    return await db('recipes')
        .where('recipe_id', recipe_id)
        .first()
}

const create = (recipe) => {
    return db('recipes').insert(recipe)
        .then(([recipe_id])=>{
            return db('recipes').where('recipe_id', recipe_id).first()
        })
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