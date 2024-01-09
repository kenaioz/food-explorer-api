const { hash, compare } = require("bcryptjs");
const AppError = require("../../utils/AppError");

class UsersServices {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async create({ name, email, password }) {
    const checkUserExists = await this.usersRepository.findByEmailOrId(
      email,
      true
    );

    if (checkUserExists) {
      throw new AppError("Este e-mail já está em uso.");
    }

    const hashedPassword = await hash(password, 8);

    const userCreated = await this.usersRepository.createUser({
      name,
      email,
      password: hashedPassword,
    });

    return userCreated;
  }

  async update({ id, name, email, new_password, old_password, role }) {
    const user = await this.usersRepository.findByEmailOrId(id);

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmailOrId(
      email,
      true
    );

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este e-mail já está em uso");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (new_password && !old_password) {
      throw new AppError(
        "Você precisa informar a senha antiga para definir a nova senha"
      );
    }

    if (new_password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere.");
      }

      user.password = await hash(new_password, 8);
    }

    if (role) {
      if (user.role == "admin" && role != "admin") {
        throw new AppError("Não é possível alterar a role de um usuário admin");
      }
      user.role = role;
    }

    await this.usersRepository.updateUser(user);

    return;
  }

  async listAll() {
    const users = await this.usersRepository.selectAll();

    return users;
  }

  async delete(id) {
    const user = await this.usersRepository.findByEmailOrId(id);

    if (user.role == "admin") {
      throw new AppError("Não é possível excluir um usuário admin");
    }

    await this.usersRepository.delete(id);

    return;
  }
}

module.exports = UsersServices;
