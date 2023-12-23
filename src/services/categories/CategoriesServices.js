const AppError = require("../../utils/AppError");

class CategoriesServices {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async listAll() {
    const categories = await this.categoriesRepository.selectAll();

    return categories;
  }

  async listIndex(id) {
    const category = await this.categoriesRepository.selectIndex(id);

    return category;
  }
}

module.exports = CategoriesServices;
