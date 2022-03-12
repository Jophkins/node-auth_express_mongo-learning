
const User = require('./models/User');
const Role = require('./models/Role');
const bcrypt = require('bcryptjs'); //для хеширования пароля
const jwt = require('jsonwebtoken'); // JWT token
const { validationResult } = require('express-validator'); // функция для возвращения ошибок в следствии валидации
const { secret } = require('./config');

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles
  }
  return jwt.sign(payload, secret, {expiresIn: "24h"});
}

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({message: "Error while registration", errors});
      }
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
      const {username, password} = req.body; // Достаем юзернейм и пароль из тела запроса
      const user = await User.findOne({username}); // Ищем юзера в базе данных
      if (!user) { // Проверяем, если юзер не найден - возвращаем сообщение
        return res.status(400).json({message: `User ${username} not found`});
      }
      const validPassword = bcrypt.compareSync(password, user.password); // Сравниваем пароли введенный и из БД
      if (!validPassword) { // Если пароль не верный - возвращаем сообщение
        return res.status(400).json({message: "Incorrect password"});
      }
      const token = generateAccessToken(user._id, user.roles); // создаем функцию для генерации токена
      return res.json({token});
    } catch (e) {
      console.log(e);
      res.status(400).json({message: 'Login error'})
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find(); // Получаем юзеров из БД
      res.json(users);
    } catch (e) {

    }
  }
}

module.exports = new authController();