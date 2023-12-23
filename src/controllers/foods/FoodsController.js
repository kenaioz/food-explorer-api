const FoodsRepository = require("../../repositories/foods/FoodsRepository");
const FoodsServices = require("../../services/foods/FoodsServices");

const FoodsIngredientsPivotServices = require("../../services/foods/FoodsIngredientsPivotServices");
const FoodsIngredientsPivotRepository = require("../../repositories/foods/FoodsIngredientsPivotRepository");

class FoodsController {
  async create(req, res) {
    const food = req.body;
    const user_id = req.user.id;

    const foodsRepository = new FoodsRepository();
    const foodsServices = new FoodsServices(foodsRepository);

    const foodsIngredientsPivotRepository =
      new FoodsIngredientsPivotRepository();
    const foodsIngredientsPivotServices = new FoodsIngredientsPivotServices(
      foodsIngredientsPivotRepository
    );

    const createdFoodLastID = await foodsServices.createData(food, user_id);

    await foodsIngredientsPivotServices.updatePivotData(
      food,
      createdFoodLastID
    );

    return res.status(201).json();
  }

  async update(req, res) {
    const food = req.body;
    const user_id = req.user.id;

    const foodsRepository = new FoodsRepository();
    const foodsServices = new FoodsServices(foodsRepository);

    const foodsIngredientsPivotRepository =
      new FoodsIngredientsPivotRepository();
    const foodsIngredientsPivotServices = new FoodsIngredientsPivotServices(
      foodsIngredientsPivotRepository
    );

    await foodsServices.putData(food, user_id);

    const { oldIngredientsArray } =
      await foodsIngredientsPivotServices.checkIngredients(
        food.id,
        food.ingredients
      );

    const newIngredientsArray = food.ingredients;

    const isEqual = await foodsIngredientsPivotServices.arrayIsEqual(
      newIngredientsArray,
      oldIngredientsArray
    );

    if (!isEqual) {
      await foodsIngredientsPivotServices.deletePivotRelations(food.id);

      await foodsIngredientsPivotServices.updatePivotData(food, food.id);
    }

    return res.status(201).json();
  }

  async delete(req, res) {
    const { id } = req.params;

    const foodsRepository = new FoodsRepository();
    const foodsServices = new FoodsServices(foodsRepository);

    await foodsServices.deleteIndex(id);

    return res.status(201).json();
  }

  async list(req, res) {
    const foodsRepository = new FoodsRepository();
    const foodsServices = new FoodsServices(foodsRepository);

    const listedFoods = await foodsServices.listAll();

    return res.status(201).json(listedFoods);
  }

  async index(req, res) {
    const { id } = req.params;

    const foodsRepository = new FoodsRepository();
    const foodsServices = new FoodsServices(foodsRepository);

    const listedFood = await foodsServices.listIndex(id);

    return res.status(201).json(listedFood);
  }
}

module.exports = FoodsController;
