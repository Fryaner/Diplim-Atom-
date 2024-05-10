const {Type} = require('../models/models');
const ApiError = require('../error/apiError');

class TypeController {
    async create(req, res) {
        const {name} = req.body;
        const typeNew = await Type.create({name});
        return res.json(typeNew);
    }
    async update(req, res) {
        const {id, name} = req.body;
        const typeUpd = await Type.update({name}, {where: {id}});
        return res.json(typeUpd);
    }
    async delete(req, res) {
        const {name} = req.body;
        const typeDel = await Type.destroy({where: {name}});
        return res.json(typeDel);
    }
    async getAll(req, res) {
        const Types = await Type.findAll();
        return res.json(Types);
    }
}

module.exports = new TypeController();