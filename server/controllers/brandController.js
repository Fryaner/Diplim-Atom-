const {Brand} = require('../models/models');

class BrandController {
    async create(req, res) {
        const {name} = req.body;
        const brandNew = await Brand.create({name});
        return res.json(brandNew);
    }
    async update(req, res) {
        const {id, name} = req.body;
        const brandUpd = await Brand.update({name}, {where: {id}});
        return res.json(brandUpd);
    }
    async delete(req, res) {
        const {name} = req.body;
        const brandDel = await Brand.destroy({where: {name}});
        return res.json(brandDel);
    }
    async getAll(req, res) {
        const Brands = await Brand.findAll();
        return res.json(Brands);
    }
}

module.exports = new BrandController();