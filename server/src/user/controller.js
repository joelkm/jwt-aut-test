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
            const results = await service.giveAccess(user);
            res.status(301).json({
                token: results.token,
                id: results.id
            })
        } catch (error) {
            next(error);
        }
    },
    resetPasswordEmail: async (req, res, next) => {
        try {
            const email = req.body.email;
            const result = await service.sendResetLink(email)
            res.status(200).json({
                link: result
            })
        } catch (error) {
            next(error)
        }
    },
    changePassword: async (req, res, next) => {
        try {
            const user = {
                id: req.params.id,
                password: req.body.password
            }
            let result = await service.changePassword(user)
            res.status(200).json({
                status: result
            })
        } catch (error) {
            next(error)
        }
    },
    logout: async (req, res, next) => {
        try {
            const id = req.params.id
            let result = await service.invalidateAccess(id)
            res.status(200).json({
                status: result
            })
        } catch (error) {
            next(error)
        }
    }
}