const db = require('../../data/dbConfig')

async function get() {
    return await db('users')
}

async function getBy(filter) {
    return await db('users').where(filter)
}

async function getById(user_id) {
    return await db('users').where('user_id', user_id)
}

async function getRecipesByUserId(user_id) {
    const userRecipes = await db('users as u')
        .leftJoin('recipes as r', 'u.user_id', 'r.user_id')
        .select('r.*')
        .where('r.user_id', user_id)
    return {
        userRecipes
    }
}

function update(user_id, changes) {
    return db("users")
      .where("user_id", user_id)
      .update(changes)
  }

async function create(newUser) {
    await db('users').insert(newUser)
    return newUser
}

module.exports = {
    get,
    getBy,
    getById,
    getRecipesByUserId,
    update,
    create
}