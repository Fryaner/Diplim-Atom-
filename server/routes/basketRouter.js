const express = require('express');
const router = express.Router();
const basketCobtroller = require('../controllers/basketController')

router.post('/', basketCobtroller.getOneBasket);
router.get('/basketDevice/:basketId', basketCobtroller.getOneBasketDevice);
router.post('/create', basketCobtroller.create);
router.post('/addDevice', basketCobtroller.addDevice);
router.delete('/delete', basketCobtroller.deleteBasket);
router.delete('/reduceDevice', basketCobtroller.reduceDevice);
router.delete('/deleteDevice', basketCobtroller.deleteDevice);

module.exports = router;