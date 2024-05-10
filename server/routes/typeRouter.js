const express = require('express');
const router = express.Router();
const typeController = require('../controllers/typeController');

router.get('/', typeController.getAll);
router.post('/create', typeController.create);
router.patch('/update', typeController.update);
router.delete('/delete', typeController.delete);

module.exports = router;