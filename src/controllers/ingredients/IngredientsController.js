const IngredientsRepository = require("../../repositories/ingredients/IngredientsRepository");
const IngredientsServices = require("../../services/ingredients/IngredientsServices");

class IngredientsController {
  async create(req, res) {
    const ingredients = req.body;

    const ingredientsRepository = new IngredientsRepository();
    const ingredientsServices = new IngredientsServices(ingredientsRepository);

    ingredientsServices.createData(ingredients);

    return res.status(201).json();
  }

  async list(req, res) {
    const ingredientsRepository = new IngredientsRepository();
    const ingredientsServices = new IngredientsServices(ingredientsRepository);

    const listedIngredients = await ingredientsServices.listAll();

    return res.status(201).json(listedIngredients);
  }

  async index(req, res) {
    const { id } = req.params;

    const ingredientsRepository = new IngredientsRepository();
    const ingredientsServices = new IngredientsServices(ingredientsRepository);

    const listedIngredient = await ingredientsServices.listIndex(id);

    return res.status(201).json(listedIngredient);
  }
}

module.exports = IngredientsController;
