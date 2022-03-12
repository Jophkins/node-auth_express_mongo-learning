
const User = require('./models/User');
const Role = require('./models/Role');
const bcrypt = require('bcryptjs'); //для хеширования пароля

class authController {
  async registration(req, res) {
    try {
      const {username, password} = req.body;
      const candidate = await User.findOne({username}); // ищем юзера
      if (candidate) {
        return res.status(400).json({message: 'Username already exist'}); // если нашли - ошибка
      }
      const hashPassowrd = bcrypt.hashSync(password, 7); //если не нашли - хешируем пароль
      const userRole = await Role.findOne({value: 'USER'}); // нашли роль
      const user = new User({username, password: hashPassowrd, roles: [userRole.value]}); // создали юзера
      await user.save(); // сохраняем в базу
      return res.json({message: 'User registration success'}); // вернули ответ на клиент
    } catch (e) {
      console.log(e);
      res.status(400).json({message: 'Registration error'})
    }
  }

  async login(req, res) {
    try {

    } catch (e) {
      console.log(e);
      res.status(400).json({message: 'Login error'})
    }
  }

  async getUsers(req, res) {
    try {
      res.json("server work")
    } catch (e) {

    }
  }
}

module.exports = new authController();