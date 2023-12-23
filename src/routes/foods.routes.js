const { Router } = require("express");

const multer = require("multer");
const uploadConfig = require("../configs/upload");
const upload = multer(uploadConfig.MULTER);

const FoodsController = require("../controllers/foods/FoodsController");
const FoodImageController = require("../controllers/foods/FoodImageController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const foodsController = new FoodsController();
const foodImageController = new FoodImageController();

const foodsRoutes = Router();

foodsRoutes.use(ensureAuthenticated);

foodsRoutes.get("/", foodsController.list);
foodsRoutes.get("/:id", foodsController.index);

foodsRoutes.post(
  "/",
  verifyUserAuthorization(["admin", "editor"]),
  foodsController.create
);
foodsRoutes.put(
  "/",
  verifyUserAuthorization(["admin", "editor"]),
  foodsController.update
);
foodsRoutes.delete(
  "/:id",
  verifyUserAuthorization(["admin", "editor"]),
  foodsController.delete
);

foodsRoutes.patch(
  "/files",
  verifyUserAuthorization(["admin", "editor"]),
  upload.single("image"),
  foodImageController.update
);

module.exports = foodsRoutes;
