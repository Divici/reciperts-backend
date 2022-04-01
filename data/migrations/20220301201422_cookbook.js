exports.up = async function(knex) {
    await knex.schema
    .createTable('users', users => {
        users.increments('user_id');
        users.string('username', 255).notNullable().unique();
        users.string('password', 255).notNullable();
      })
    .createTable('recipes', tbl=>{
        tbl.increments('recipe_id')
        tbl.string('recipe_name',128).notNullable()
        tbl.string('prep_time')
        tbl.string('cook_time')
        tbl.string('category',64)
        tbl.string('source',128)
        tbl.text('ingredients').notNullable()
        tbl.text('steps')
        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('user_id')
            .inTable('users')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT')
    })
};

exports.down = async function(knex) {
    await knex.schema
        .dropTableIfExists('recipes')
        .dropTableIfExists('users')
};
