const AppError = require("../../utils/AppError");

class FoodsServices {
  constructor(foodsRepository) {
    this.foodsRepository = foodsRepository;
  }

  async createData(foodJSON, user_id) {
    const lastID = await this.foodsRepository.insertData(foodJSON, user_id);

    return lastID;
  }

  async putData(foodJSON, user_id) {
    await this.foodsRepository.updateData(foodJSON, user_id);

    return;
  }

  async deleteIndex(foodID) {
    await this.foodsRepository.deleteById(foodID);

    return;
  }

  async listAll() {
    const foods = await this.foodsRepository.selectAll();

    return foods;
  }

  async listIndex(foodID) {
    const food = await this.foodsRepository.selectById(foodID);

    food.ingredients_names = JSON.parse(food.ingredients_names);

    return food;
  }
}

module.exports = FoodsServices;
