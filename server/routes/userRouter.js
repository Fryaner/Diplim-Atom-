const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/login', userController.login);
router.get('/auth', userController.check)
router.post('/register', userController.registration);

module.exports = router;