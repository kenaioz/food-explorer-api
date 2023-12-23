const AppError = require("../../utils/AppError");

const DiskStorage = require("../../providers/DiskStorage");

class FoodsImageServices {
  constructor(foodsImageRepository) {
    this.foodsImageRepository = foodsImageRepository;
  }

  async uploadImage(food_id, imageFilename) {
    const diskStorage = new DiskStorage();

    const food = await this.foodsImageRepository.selectIndex(
      food_id,
      imageFilename
    );

    if (food.image) {
      await diskStorage.deleteFile(food.image);
    }

    const filename = await diskStorage.saveFile(imageFilename);
    food.image = filename;

    await this.foodsImageRepository.updateData(food_id, imageFilename);

    return filename;
  }
}

module.exports = FoodsImageServices;
