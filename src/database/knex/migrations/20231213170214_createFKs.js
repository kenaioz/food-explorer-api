exports.up = (knex) =>
  knex.schema.table("foods", (table) => {
    table.foreign("user_id").references("id").inTable("users");
    table.foreign("categories_id").references("id").inTable("food_categories");
  });

exports.down = (knex) => knex.schema.dropTable("food_categories");
