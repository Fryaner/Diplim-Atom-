const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {body} = require('express-validator');
const authMiddlleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/registration', 
    body('email', 'Введите коректный адресс элекронной почты').isEmail(),
    body('password', 'Длина пароля должны быть не меньше 3 символов').isLength({min: 3, max: 32}),
    userController.registration);
router.post('/delete', userController.delete)
router.post('/login', userController.login);
router.patch('/edit', userController.edit);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/', authMiddlleware, userController.getUsers);

router.post('/addRole',userController.addRole);
router.delete('/removeRole',userController.removeRole);
router.get('/role', userController.getAllRoles);

module.exports = router;