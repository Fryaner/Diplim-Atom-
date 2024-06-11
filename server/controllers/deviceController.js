const uuid = require('uuid');
const path = require('path');
const {Device} = require('../models/models');
const {DeviceInfo} = require('../models/models');
const ApiError = require('../error/apiError');

class DeviceController {
    async create(req, res, next) {
        try {
            let {model, price, typeId, brandId, info} = req.body;
            const {image} = req.files; 
            let fileName = uuid.v4() + ".jpg";
            image.mv(path.resolve(__dirname, '..', 'static', fileName));
            const device = await Device.create({model, price, typeId, brandId, image: fileName});

            if (info) {
                info = JSON.parse(info)
                info.forEach(i => {
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id,
                    })
                });
            }

            return res.json(device); 
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async update(req, res) {
        let {model, price, typeId, brandId, info, id} = req.body;

        const deviceUpd = await Device.update({model, price, typeId, brandId}, {where: {id}});
        return res.json(deviceUpd);
    }

    async delete(req, res) {
        const {id} = req.body;
        const deviceDel = await Device.destroy({where: {id}});
        return res.json(deviceDel);
    }

    async getOne(req, res) {
        const {id} = req.params;
        const device = await Device.findOne({
            where: {id},
            include: [{model: DeviceInfo, as: 'info'}]
            }
        )
        return res.json(device);
    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        let devices = await Device.findAndCountAll({brandId, typeId})
        // if (!brandId && !typeId) {
        //     devices = await Device.findAndCountAll({limit, offset})
        // }
        // if (brandId && !typeId) {
        //     devices = await Device.findAndCountAll({where: {brandId, limit, offset}})
        // }
        // if (!brandId && typeId) {
        //     devices = await Device.findAndCountAll({where: {typeId, limit, offset}})
        // }
        // if (brandId && typeId) {
        //     devices = await Device.findAndCountAll({where: {typeId, brandId, limit, offset}})
        // }
        return res.json(devices);
    }
}

module.exports = new DeviceController();