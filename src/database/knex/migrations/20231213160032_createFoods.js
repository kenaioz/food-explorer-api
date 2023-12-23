exports.up = (knex) =>
  knex.schema.createTable("foods", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("description").notNullable();
    table.string("categories_id").notNullable();
    table.string("user_id").notNullable();
    table.decimal("price", 8, 2).notNullable();
    table.string("image");
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("foods");
