const AppError = require("../../utils/AppError");

class FoodsIngredientsPivotServices {
  constructor(foodsIngredientsPivotRepository) {
    this.foodsIngredientsPivotRepository = foodsIngredientsPivotRepository;
  }

  async checkIngredients(foodID, newIngredientsArray) {
    const { oldIngredientsArray } =
      await this.foodsIngredientsPivotRepository.getIngredientsToCheck(
        foodID,
        newIngredientsArray
      );

    return { newIngredientsArray, oldIngredientsArray };
  }

  async updatePivotData(foodJSON, foodID) {
    const placeholders = foodJSON.ingredients.map(() => "(?, ?)").join(",");

    const pivotDataArray = [];
    foodJSON.ingredients.forEach((ingredientID) => {
      pivotDataArray.push(foodID, ingredientID);
    });

    await this.foodsIngredientsPivotRepository.updateIngredientsPivot(
      placeholders,
      pivotDataArray
    );

    return;
  }

  async deletePivotRelations(foodID) {
    await this.foodsIngredientsPivotRepository.deleteIngredientsPivot(foodID);
  }

  async arrayIsEqual(newIngredientsArray, oldIngredientsArray) {
    if (oldIngredientsArray.length !== newIngredientsArray.length) {
      return false;
    }

    const sortedOldArray = oldIngredientsArray.slice().sort();
    const sortedNewArray = newIngredientsArray.slice().sort();

    for (const [index, value] of sortedOldArray.entries()) {
      if (value !== sortedNewArray[index]) {
        return false;
      }
    }

    return true;
  }
}

module.exports = FoodsIngredientsPivotServices;
