const sqliteConnection = require("../../database/sqlite");

class FoodsRepository {
  async insertData(foodData, user_id) {
    const database = await sqliteConnection();

    const { lastID } = await database.run(
      `INSERT INTO foods(name, description, categories_id, price, user_id) VALUES (?, ?, ?, ?, ?)`,
      [
        foodData.name,
        foodData.description,
        foodData.category,
        foodData.price,
        user_id,
      ]
    );

    return lastID;
  }

  async updateData(foodData, user_id) {
    const database = await sqliteConnection();

    await database.run(
      `UPDATE foods
        SET name = (?),
        description = (?),
        categories_id = (?),
        price = (?),
        user_id = (?)
      WHERE id = (?);`,
      [
        foodData.name,
        foodData.description,
        foodData.category,
        foodData.price,
        user_id,
        foodData.id,
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
      `SELECT foods.image,
        foods.id,
        JSON_OBJECT('id', food_categories.id, 'name', food_categories.name) AS category,
        foods.name,
        foods.description,
        foods.price
      FROM foods
      LEFT JOIN food_categories ON foods.categories_id = food_categories.id`
    );

    return foods;
  }

  async selectById(id) {
    const database = await sqliteConnection();
    const food = await database.get(
      `SELECT foods.image,
        foods.id,
        foods.name,
        foods.description,
        JSON_GROUP_ARRAY(JSON_OBJECT('id', food_ingredients.id, 'name', food_ingredients.name)) AS ingredients,
        JSON_OBJECT('id', food_categories.id, 'name', food_categories.name) AS category,
        foods.price
      FROM foods
      LEFT JOIN food_ingredients_pivot ON foods.id = food_ingredients_pivot.food_id
      LEFT JOIN food_ingredients ON food_ingredients_pivot.ingredient_id = food_ingredients.id
      LEFT JOIN food_categories ON foods.categories_id = food_categories.id
      WHERE foods.id = (?)`,
      [id]
    );

    return food;
  }
}

module.exports = FoodsRepository;
