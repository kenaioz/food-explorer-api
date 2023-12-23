const AppError = require("../../utils/AppError");

class IngredientsServices {
  constructor(ingredientsRepository) {
    this.ingredientsRepository = ingredientsRepository;
  }

  async createData(ingredientsArray) {
    await this.ingredientsRepository.insertData(ingredientsArray);

    return;
  }

  async listAll() {
    const categories = await this.ingredientsRepository.selectAll();

    return categories;
  }

  async listIndex(id) {
    const category = await this.ingredientsRepository.selectIndex(id);

    return category;
  }
}

module.exports = IngredientsServices;
