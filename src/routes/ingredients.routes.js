const { Router } = require("express");

const IngredientsController = require("../controllers/ingredients/IngredientsController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const ingredientsController = new IngredientsController();

const ingredientsRoutes = Router();

ingredientsRoutes.use(ensureAuthenticated);

ingredientsRoutes.post(
  "/",
  verifyUserAuthorization(["admin", "editor"]),
  ingredientsController.create
);
ingredientsRoutes.get("/", ingredientsController.list);
ingredientsRoutes.get("/:id", ingredientsController.index);

module.exports = ingredientsRoutes;
