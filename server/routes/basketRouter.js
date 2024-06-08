const express = require('express');
const router = express.Router();
const basketCobtroller = require('../controllers/basketController')

router.get('/', basketCobtroller.getOne);
router.post('/create', basketCobtroller.create);
router.post('/addDevice', basketCobtroller.addDevice);
router.delete('/delete', basketCobtroller.delete);
router.delete('/deleteDevice', basketCobtroller.deleteDevice);

module.exports = router;