const { Router } = require("express");

const usersRouter = require("./users.routes");
const sessionsRouter = require("./sessions.routes");

const categoriesRouter = require("./categories.routes");
const ingredientsRoutes = require("./ingredients.routes");
const foodsRoutes = require("./foods.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);

routes.use("/categories", categoriesRouter);
routes.use("/ingredients", ingredientsRoutes);
routes.use("/foods", foodsRoutes);

module.exports = routes;
