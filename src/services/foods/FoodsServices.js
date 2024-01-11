const AppError = require("../../utils/AppError");

class FoodsServices {
  constructor(foodsRepository) {
    this.foodsRepository = foodsRepository;
  }

  async createData(foodData, user_id) {
    const lastID = await this.foodsRepository.insertData(foodData, user_id);

    return lastID;
  }

  async putData(foodData, user_id) {
    await this.foodsRepository.updateData(foodData, user_id);

    return;
  }

  async deleteIndex(foodID) {
    await this.foodsRepository.deleteById(foodID);

    return;
  }

  async listAll() {
    const foods = await this.foodsRepository.selectAll();

    const updatedFoods = foods.map((food) => {
      return {
        ...food,
        category: JSON.parse(food.category),
      };
    });

    return updatedFoods;
  }

  async listIndex(foodID) {
    const food = await this.foodsRepository.selectById(foodID);

    food.ingredients = JSON.parse(food.ingredients);
    food.category = JSON.parse(food.category);

    if (!food.ingredients[0].id) {
      food.ingredients = [];
    }

    return food;
  }
}

module.exports = FoodsServices;
