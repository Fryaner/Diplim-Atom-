const express = require('express');
const router = express.Router();

router.get('/login');
router.get('/auth')
router.post('/register');

module.exports = router;