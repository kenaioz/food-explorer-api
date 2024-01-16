const CategoriesRepository = require("../../repositories/categories/CategoriesRepository");
const CategoriesServices = require("../../services/categories/CategoriesServices");

class CategoriesController {
  async create(req, res) {
    const categories = req.body;

    const categoriesRepository = new CategoriesRepository();
    const categoriesServices = new CategoriesServices(categoriesRepository);

    categoriesServices.createData(categories);

    return res.status(201).json();
  }

  async list(req, res) {
    const categoriesRepository = new CategoriesRepository();
    const categoriesServices = new CategoriesServices(categoriesRepository);

    const listedCategories = await categoriesServices.listAll();

    return res.status(201).json(listedCategories);
  }

  async index(req, res) {
    const { id } = req.params;

    const categoriesRepository = new CategoriesRepository();
    const categoriesServices = new CategoriesServices(categoriesRepository);

    const listedCategory = await categoriesServices.listIndex(id);

    return res.status(201).json(listedCategory);
  }
}

module.exports = CategoriesController;
