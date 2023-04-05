const service = require('./service')

module.exports = {
    signUp: async (req, res, next) => {
        try {
            let user = req.body;
            user = await service.register(user);
            res.status(201).json({
                user: user
            })
        } catch (error) {
            next(error)
        }
    },
    login: async (req, res, next) => {
        try {
            const user = req.body;
            const token = await service.giveAccess(user);
            res.status(301).json({
                token: token,
            })
        } catch (error) {
            next(error);
        }
    },
    resetPasswordEmail: async (req, res, next) => {
        try {
            const email = req.body.email;
            const result = service.sendResetLink(email)
            res.status(200).json({
                status: result
            })
        } catch (error) {
            next(error)
        }
    },
    changePassword: async (req, res, next) => {
        try {
            const email = req.body.email;
            const result = service.sendResetLink(email)
            res.status(200).json({
                status: result
            })
        } catch (error) {
            next(error)
        }
    }
}