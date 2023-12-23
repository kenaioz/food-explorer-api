exports.up = (knex) =>
  knex.schema.createTable("food_ingredients", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
  });

exports.down = (knex) => knex.schema.dropTable("food_ingredients");
