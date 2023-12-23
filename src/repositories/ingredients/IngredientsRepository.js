const sqliteConnection = require("../../database/sqlite");

class IngredientsRepository {
  async insertData(ingredientsArray) {
    const placeholders = ingredientsArray.map((ingredient) => "(?)").join(",");
    const sqlQuery = `INSERT INTO food_ingredients(name) VALUES ${placeholders}`;

    const database = await sqliteConnection();
    await database.run(sqlQuery, ingredientsArray);

    return;
  }

  async selectAll() {
    const database = await sqliteConnection();
    const ingredients = await database.all("SELECT * FROM food_ingredients");

    return ingredients;
  }

  async selectIndex(id) {
    const database = await sqliteConnection();
    const ingredients = await database.get(
      "SELECT * FROM food_ingredients WHERE id = (?)",
      [id]
    );

    return ingredients;
  }
}

module.exports = IngredientsRepository;
