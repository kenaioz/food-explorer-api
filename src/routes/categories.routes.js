const { Router } = require("express");

const CategoriesController = require("../controllers/categories/CategoriesController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const categoriesRoutes = Router();

const categoriesController = new CategoriesController();

categoriesRoutes.use(ensureAuthenticated);

categoriesRoutes.get("/", categoriesController.list);
categoriesRoutes.get("/:id", categoriesController.index);

module.exports = categoriesRoutes;
