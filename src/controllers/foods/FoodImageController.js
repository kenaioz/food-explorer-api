const AppError = require("../../utils/AppError");

const FoodsImageServices = require("../../services/foods/FoodsImageServices");
const FoodsImageRepository = require("../../repositories/foods/FoodsImageRepository");

class FoodImageController {
  async update(req, res) {
    const food_id = req.body.food_id;
    const imageFilename = req.file.filename;

    const foodsImageRepository = new FoodsImageRepository();
    const foodsImageServices = new FoodsImageServices(foodsImageRepository);

    const uploadedFilename = await foodsImageServices.uploadImage(
      food_id,
      imageFilename
    );

    return res.status(201).json(uploadedFilename);
  }
}

module.exports = FoodImageController;
