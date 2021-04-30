const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const errorMessages = require('../utils/errorMessages')
const jwt = require('jsonwebtoken')

module.exports = {
    create: async function (req, res, next) {
        if (req.body.password !== req.body.confirmation) {
            res.status(400).json({
                error: true, message: "Password and Confirmation must match"
            })
            return
        } else if (!req.body.username || !req.body.password || !req.body.confirmation) {
            res.status(400).json({
                error: true, message: "All fields are required"
            })
            return
        }
        try {
            const document = new userModel({
                username: req.body.username,
                password: req.body.password
            })
            const response = await document.save()
            res.status(200).json({ response })
        }
        catch (e) {
            e.status = 400;
            next()
        }
    },
    login: async function (req, res, next) {
        if (!req.body.username || !req.body.password) {
            res.status(400).json({
                error: true, message: "All fields are required"
            })
            return
        }
        try {
            const user = await userModel.findOne({ username: req.body.username })
            if (!user) {
                res.status(400).json({ error: true, message: errorMessages.badUserOrPassword })
                return
            }
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                res.status(400).json({ error: true, message: errorMessages.badUserOrPassword })
                return
            }

            const token = jwt.sign({ userId: user._id }, req.app.get("secretKey"), { expiresIn: "1h" })
            res.status(200).json({ message: "login Ok", token: token })

        } catch (e) {
            e.status = 400;
            next()
        }
    }
}