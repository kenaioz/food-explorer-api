const sqliteConnection = require("../../database/sqlite");

class FoodsIngredientsPivotRepository {
  async getIngredientsToCheck(foodID) {
    const database = await sqliteConnection();

    const food = await database.get(
      `SELECT foods.id,
        JSON_GROUP_ARRAY(food_ingredients.id) AS ingredients_id
        FROM foods
        JOIN food_ingredients_pivot ON foods.id = food_ingredients_pivot.food_id
        JOIN food_ingredients ON food_ingredients_pivot.ingredient_id = food_ingredients.id
      WHERE foods.id = (?)`,
      [foodID]
    );

    const oldIngredientsArray = JSON.parse(food.ingredients_id);

    return { oldIngredientsArray };
  }

  async updateIngredientsPivot(placeholders, pivotDataArray) {
    const sqlQuery = `INSERT INTO food_ingredients_pivot(food_id, ingredient_id)
    VALUES ${placeholders}`;

    const database = await sqliteConnection();
    await database.run(sqlQuery, pivotDataArray);

    return;
  }

  async deleteIngredientsPivot(foodID) {
    const database = await sqliteConnection();

    await database.run(
      `DELETE FROM food_ingredients_pivot WHERE food_id = (?)`,
      [foodID]
    );

    return;
  }
}

module.exports = FoodsIngredientsPivotRepository;
