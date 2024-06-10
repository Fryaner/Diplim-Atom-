const express = require('express');
const router = express.Router();
const favoriteController = require('./../controllers/favoriteController');

router.get('/:favoriteId', favoriteController.getDevices);
router.post('/', favoriteController.getFavorite);
router.post('/addDevice', favoriteController.addDevice);
router.post('/create', favoriteController.create);
router.delete('/deleteDevice', favoriteController.deleteDevice);
router.delete('/delete', favoriteController.delete);

module.exports = router;