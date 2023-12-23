const sqliteConnection = require("../../database/sqlite");

class FoodsRepository {
  async insertData(foodJSON, user_id) {
    const database = await sqliteConnection();

    const { lastID } = await database.run(
      `INSERT INTO foods(name, description, categories_id, price, user_id) VALUES (?, ?, ?, ?, ?)`,
      [
        foodJSON.name,
        foodJSON.description,
        foodJSON.category,
        foodJSON.price,
        user_id,
      ]
    );

    return lastID;
  }

  async updateData(foodJSON, user_id) {
    const database = await sqliteConnection();

    const { lastID } = await database.run(
      `UPDATE foods
        SET name = (?),
        description = (?),
        categories_id = (?),
        price = (?),
        user_id = (?)
      WHERE id = (?);`,
      [
        foodJSON.name,
        foodJSON.description,
        foodJSON.category,
        foodJSON.price,
        user_id,
        foodJSON.id,
      ]
    );

    return;
  }

  async deleteById(foodID) {
    const database = await sqliteConnection();
    await database.run(`DELETE FROM foods WHERE id = (?)`, [foodID]);

    return;
  }

  async selectAll() {
    const database = await sqliteConnection();

    const foods = await database.all(
      `SELECT foods.id,
        food_categories.name AS category_name,
        foods.name,
        foods.description,
        foods.price
      FROM foods
      JOIN food_categories ON foods.categories_id = food_categories.id`
    );

    return foods;
  }

  async selectById(id) {
    const database = await sqliteConnection();
    const food = await database.get(
      `SELECT foods.id,
        foods.name,
        foods.description,
        JSON_GROUP_ARRAY(food_ingredients.name) AS ingredients_names,
        food_categories.name AS category_name,
        foods.price
      FROM foods
      JOIN food_ingredients_pivot ON foods.id = food_ingredients_pivot.food_id
      JOIN food_ingredients ON food_ingredients_pivot.ingredient_id = food_ingredients.id
      JOIN food_categories ON foods.categories_id = food_categories.id
      WHERE foods.id = (?)`,
      [id]
    );

    return food;
  }
}

module.exports = FoodsRepository;
