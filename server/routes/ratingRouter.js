const express = require('express');
const router = express.Router();
const ratingController = require('./../controllers/ratingController');

router.get('/:deviceId', ratingController.getAll);
router.get('/currentRate/:userId/:deviceId', ratingController.getOne);
router.post('/create', ratingController.create);
router.patch('/update', ratingController.update);
router.delete('/delete', ratingController.delete);

module.exports = router;