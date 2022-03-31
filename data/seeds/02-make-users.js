const users = [
    {username: 'Test', password: 'Testing12345'}
]

exports.seed = async function(knex) {
    await knex('users').insert(users)
};