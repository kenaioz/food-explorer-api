exports.up = (knex) =>
  knex.schema.createTable("food_ingredients_pivot", (table) => {
    table.increments("id").primary();
    table.integer("food_id").references("foods.id");
    table.integer("ingredient_id").references("food_ingredients.id");
  });

exports.down = (knex) => knex.schema.dropTable("food_ingredients_pivot");
