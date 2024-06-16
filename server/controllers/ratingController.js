const {Raiting} = require('../models/models');

class RatingController {
    async create(req, res) {
        try {
            const {userId, rate, feedback, deviceId} = req.body;
            const ratingNew = await Raiting.create({userId, rate, feedback, deviceId});
            return res.json(ratingNew);
        } catch (e) {
            return res.json(e);
        }

    }
    async update(req, res) {
        try {
            const {userId, rate, feedback, deviceId} = req.body;
            const ratingUpd = await Raiting.update({rate, feedback}, {where: {userId, deviceId}});
            return res.json(ratingUpd);
        } catch (e) {
            return res.json(e); 
        }
    }
    async delete(req, res) {
        try {
            const {userId, deviceId} = req.body;
            const ratingDel = await Raiting.destroy({where: {userId, deviceId}});
            return res.json(ratingDel);           
        } catch (e) {
            return res.json(e);   
        }
    }
    async getAll(req, res) {
        try {
        const {deviceId} = req.params;
        const rating = await Raiting.findAll({where: {deviceId}});
        return res.json(rating);            
        } catch (e) {
            return res.json(e);    
        }
    }

    async getOne(req, res) {
        try {
        const {userId, deviceId} = req.params;
        const ratingOne = await Raiting.findOne({where: {userId, deviceId}});
        return res.json(ratingOne);            
        } catch (e) {
            return res.json(e);    
        }

    }
}

module.exports = new RatingController();