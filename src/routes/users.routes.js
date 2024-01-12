const { Router } = require("express");

const UsersController = require("../controllers/users/UsersController");
const usersController = new UsersController();

const UserValidationController = require("../controllers/validation/UserValidationController");
const userValidationController = new UserValidationController();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const usersRoutes = Router();

usersRoutes.post("/", usersController.create);
usersRoutes.get(
  "/validation",
  ensureAuthenticated,
  userValidationController.validation
);

usersRoutes.get(
  "/",
  ensureAuthenticated,
  verifyUserAuthorization(["admin"]),
  usersController.listAll
);
usersRoutes.delete(
  "/:id",
  ensureAuthenticated,
  verifyUserAuthorization(["admin"]),
  usersController.delete
);
usersRoutes.patch(
  "/",
  ensureAuthenticated,
  verifyUserAuthorization(["admin"]),
  usersController.update
);

module.exports = usersRoutes;
