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

    async delete(req, res) {
        try {
            const {userId} = req.body;
            const basketUser = await Basket.destroy({where: {userId}});
            return res.json(basketUser);
        } catch(e) {
            return res.json(e)
        }
    }

    async getOne(req, res) {
        try {
            const {basketId} = req.body;
            const basketUser = await BasketDevice.findOne({where: {basketId}});
            return res.json(basketUser);
        } catch(e) {
            return res.json(e)
        }
    }
}

module.exports = new BasketController();