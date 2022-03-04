const users = [
    {username: 'David', password: '12345'},
    {username: 'Paul', password: 'password'}
]

exports.seed = async function(knex) {
    await knex('users').insert(users)
};