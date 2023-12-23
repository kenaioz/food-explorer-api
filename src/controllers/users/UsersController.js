const { hash, compare } = require("bcryptjs");
const AppError = require("../../utils/AppError");
const sqliteConnection = require("../../database/sqlite");

const UsersRepository = require("../../repositories/users/UsersRepository");
const UsersServices = require("../../services/users/UsersServices");

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body;

    const usersRepository = new UsersRepository();
    const usersService = new UsersServices(usersRepository);

    await usersService.create({ name, email, password });

    return res.status(201).json();
  }

  async update(req, res) {
    const { id, name, email, new_password, old_password, role } = req.body;

    const usersRepository = new UsersRepository();
    const usersService = new UsersServices(usersRepository);

    await usersService.update({
      id,
      name,
      email,
      new_password,
      old_password,
      role,
    });

    return res.status(201).json();
  }

  async listAll(req, res) {
    const usersRepository = new UsersRepository();
    const usersService = new UsersServices(usersRepository);

    const users = await usersService.listAll();

    return res.status(201).json(users);
  }

  async delete(req, res) {
    const { id } = req.params;

    const usersRepository = new UsersRepository();
    const usersService = new UsersServices(usersRepository);

    await usersService.delete(id);

    return res.status(201).json();
  }
}

module.exports = UsersController;
