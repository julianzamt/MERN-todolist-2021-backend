const postModel = require('../models/postModel')

module.exports = {
    getAll: async function (req, res, next) {
        try {
            const posts = await postModel.find({}).sort({ date: -1 })
            res.json(posts)
        } catch (e) {
            e.status = 400;
            next(e)
        }
    },
    create: async function (req, res, next) {
        try {
            const document = new postModel({
                title: req.body.title,
                description: req.body.description,
            })
            const response = await document.save()
            res.json(response)
        }
        catch (e) {
            e.status = 400;
            next(e)
        }
    }
}