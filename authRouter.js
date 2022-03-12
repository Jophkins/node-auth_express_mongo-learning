const Router = require('express');
const router = new Router();
const controller = require('./authController');
const {check} = require('express-validator'); // Валидатор для полей логина и пароля

router.post('/registration', [
  check('username', "Username cannot be empty").notEmpty(),
  check('password', "Password must be in range 4-10 characters").isLength({min: 4, max: 10})
], controller.registration);
router.post('/login', controller.login);
router.get('/users', controller.getUsers);

module.exports = router;