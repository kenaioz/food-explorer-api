const sqliteConnection = require("../../database/sqlite");

class FoodsImageRepository {
  async selectIndex(food_id, imageFilename) {
    const database = await sqliteConnection();

    const food = await database.get(
      `SELECT id, image FROM foods
      WHERE foods.id = (?);`,
      [food_id]
    );

    return food;
  }

  async updateData(food_id, imageFilename) {
    const database = await sqliteConnection();

    await database.get(
      `UPDATE foods
      SET image = (?)
      WHERE id = (?);`,
      [imageFilename, food_id]
    );

    return;
  }
}

module.exports = FoodsImageRepository;
