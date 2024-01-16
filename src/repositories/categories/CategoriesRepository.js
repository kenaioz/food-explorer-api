const sqliteConnection = require("../../database/sqlite");

class CategoriesRepository {
  async insertData(categoriesArray) {
    const placeholders = categoriesArray.map(() => "(?)").join(",");
    const sqlQuery = `INSERT INTO food_categories(name) VALUES ${placeholders}`;

    const database = await sqliteConnection();
    await database.run(sqlQuery, categoriesArray);

    return;
  }

  async selectAll() {
    const database = await sqliteConnection();
    const categories = await database.all("SELECT * FROM food_categories");

    return categories;
  }

  async selectIndex(id) {
    const database = await sqliteConnection();
    const category = await database.get(
      "SELECT * FROM food_categories WHERE id = (?)",
      [id]
    );

    return category;
  }
}

module.exports = CategoriesRepository;
