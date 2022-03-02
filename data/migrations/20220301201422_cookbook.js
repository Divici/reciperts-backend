exports.up = async function(knex) {
    await knex.schema
    .createTable('recipes', tbl=>{
        tbl.increments('recipe_id')
        tbl.string('recipe_name',128).notNullable().unique()
        tbl.float('prep_time')
        tbl.float('cook_time')
        tbl.string('category',64)
        tbl.string('source',128)
    })
    .createTable('ingredients', tbl=>{
        tbl.increments('ingredient_id')
        tbl.string('ingredient_name',128).notNullable().unique()
        tbl.string('ingredient_unit', 50)
        tbl.float('quantity').notNullable()
        tbl.integer('recipe_id')
            .unsigned() 
            .notNullable()
            .references('recipe_id')
            .inTable('recipes')
            .onDelete('restrict')
            .onUpdate('restrict')
    })
    .createTable('steps', tbl=>{
        tbl.increments('step_id')
        tbl.string('step_instruction',250).notNullable()
        tbl.integer('step_number').notNullable()
        tbl.integer('recipe_id')
            .unsigned() 
            .notNullable()
            .references('recipe_id')
            .inTable('recipes')
            .onDelete('restrict')
            .onUpdate('restrict')
    })
};

exports.down = async function(knex) {
    await knex.schema
        .dropTableIfExists('steps')
        .dropTableIfExists('ingredients')
        .dropTableIfExists('recipes')
};
