const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const authConfig = require("../configs/auth");
const AppError = require("../utils/AppError");

const UsersRepository = require("../repositories/users/UsersRepository");

class SessionsController {
  async create(req, res) {
    const { email, password } = req.body;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findByEmailOrId(email, true);

    if (!user) {
      throw new AppError("E-mail e/ou senha incorreta.", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("E-mail e/ou senha incorreta.", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ role: user.role }, secret, {
      subject: String(user.id),
      expiresIn,
    });

    res.status(201).json({
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  }
}

module.exports = SessionsController;
