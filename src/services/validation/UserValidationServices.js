const AppError = require("../../utils/AppError");

class UsersServices {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async validate(user) {
    const checkUserExists = await this.usersRepository.findByEmailOrId(user.id);

    if (checkUserExists.length === 0) {
      throw new AppError("Unauthorized", 401);
    }

    return;
  }
}

module.exports = UsersServices;
