const {Favorite} = require('../models/models');
const {FavoriteDevice} = require('../models/models');

class favoriteController {
    async create(req, res) {
        try {
            const {userId} = req.body;
            const newFavorite = await Favorite.create({userId});
            return res.json(newFavorite);
        } catch(e) {
            return res.json(e)
        }
    }

    async delete(req, res) {
        try {
            const {userId} = req.body;
            const deleteFavorite = await Favorite.destroy({where: {userId}});
            return res.json(deleteFavorite);
        } catch(e) {
            return res.json(e)
        }
    }


    async addDevice(req, res) {
        try {
            const {favoriteId, deviceId} = req.body;
            const newDeviceToFavorite = await FavoriteDevice.create({favoriteId, deviceId});
            return res.json(newDeviceToFavorite);
        } catch(e) {
            return res.json(e)
        }
    }

    async deleteDevice(req, res) {
        try {
            const {favoriteId, deviceId} = req.body;
            const deleteDevoceToFavorite = await FavoriteDevice.destroy({where: {favoriteId, deviceId}});
            return res.json(deleteDevoceToFavorite);
        } catch(e) {
            return res.json(e)
        }
    }
    

    async getDevices(req, res) {
        try {
            const {favoriteId} = req.params;
            const favoriteDevices = await FavoriteDevice.findAll({where: {favoriteId}});
            return res.json(favoriteDevices);
        } catch(e) {
            return res.json(e)
        }
    }

    async getFavorite(req, res) {
        try {
            const {userId} = req.body;
            const favorite = await Favorite.findOne({where: {userId}});
            return res.json(favorite);
        } catch(e) {
            return res.json(e)
        }
    }
}

module.exports = new favoriteController();