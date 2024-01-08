const sqliteConnection = require("../../database/sqlite");
const AppError = require("../../utils/AppError");

class UsersRepository {
  async findByEmailOrId(identifier, byEmail = false) {
    const database = await sqliteConnection();
    let user;

    if (byEmail) {
      user = await database.get(
        "SELECT id, name, email, role FROM users WHERE email = (?)",
        [identifier]
      );
    } else {
      user = await database.get(
        "SELECT id, name, email, password, role FROM users WHERE id = (?)",
        [identifier]
      );
    }

    return user;
  }

  // async findByEmail(email) {
  //   const database = await sqliteConnection();
  //   const user = await database.get(
  //     "SELECT id, name, email, role FROM users WHERE email = (?)",
  //     [email]
  //   );

  //   return user;
  // }

  async createUser({ name, email, password }) {
    const database = await sqliteConnection();
    const userId = await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );
    return { id: userId };
  }

  async updateUser(user) {
    const database = await sqliteConnection();
    await database.run(
      `UPDATE users
        SET name = (?),
          email = (?),
          password = (?),
          role = (?)
      WHERE id = (?);`,
      [user.name, user.email, user.password, user.role, user.id]
    );
    return;
  }

  // async selectIndex(userID) {
  //   const database = await sqliteConnection();
  //   const user = await database.get(
  //     "SELECT id, name, email, password, role FROM users WHERE id = (?)",
  //     [userID]
  //   );

  //   return user;
  // }

  async delete(userID) {
    const database = await sqliteConnection();
    const users = await database.run(`DELETE FROM users WHERE id = (?)`, [
      userID,
    ]);

    return users;
  }
}

module.exports = UsersRepository;
