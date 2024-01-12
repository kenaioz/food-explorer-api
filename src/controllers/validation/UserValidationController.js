const UsersRepository = require("../../repositories/users/UsersRepository");
const UserValidationServices = require("../../services/validation/UserValidationServices");

class UsersValidatedController {
  async validation(req, res) {
    const { user } = req;

    const usersRepository = new UsersRepository();
    const userValidationService = new UserValidationServices(usersRepository);

    await userValidationService.validate(user);

    return res.status(200).json();
  }
}

module.exports = UsersValidatedController;
