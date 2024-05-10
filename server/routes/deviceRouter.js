const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');

router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getOne);
router.post('/create', deviceController.create);
router.patch('/update', deviceController.update);
router.delete('/delete', deviceController.delete);

module.exports = router;