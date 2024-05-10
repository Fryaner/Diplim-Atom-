const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');

router.get('/', brandController.getAll);
router.post('/create', brandController.create);
router.patch('/update', brandController.update);
router.delete('/delete', brandController.delete);

module.exports = router;