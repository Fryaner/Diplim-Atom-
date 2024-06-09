const {Basket} = require('../models/models');
const {BasketDevice} = require('../models/models');

class BasketController {

    async create(req, res) {
        try {
            const {userId} = req.body;
            const basketUser = await Basket.create({userId});
            return res.json(basketUser);
        } catch(e) {
            return res.json(e)
        }
    }

    async addDevice(req, res) {
        try {
            const {basketId, deviceId} = req.body;
            const newDeviceToBasket = await BasketDevice.create({basketId, deviceId});
            return res.json(newDeviceToBasket);
        } catch(e) {
            return res.json(e)
        }
    }

    async deleteDevice(req, res) {
        try {
            const {basketId, deviceId} = req.body;
            const newDeviceToBasket = await BasketDevice.destroy({where: {basketId, deviceId}});
            return res.json(newDeviceToBasket);
        } catch(e) {
            return res.json(e)
        }
    }
    
    async reduceDevice(req, res) {
        try {
            const {id, basketId} = req.body;
            const basketUser = await BasketDevice.destroy({where: {id, basketId}});
            return res.json(basketUser);
        } catch(e) {
            return res.json(e)
        }
    }

    async deleteBasket(req, res) {
        try {
            const {userId} = req.body;
            const basketUser = await Basket.destroy({where: {userId}});
            return res.json(basketUser);
        } catch(e) {
            return res.json(e)
        }
    }

    async getOneBasketDevice(req, res) {
        try {
            const {basketId} = req.params;
            const basketDeviceUser = await BasketDevice.findAll({where: {basketId}});
            return res.json(basketDeviceUser);
        } catch(e) {
            return res.json(e)
        }
    }

    async getOneBasket(req, res) {
        try {
            const {userId} = req.body;
            const basketUser = await Basket.findOne({where: {userId}});
            return res.json(basketUser);
        } catch(e) {
            return res.json(e)
        }
    }
}

module.exports = new BasketController();