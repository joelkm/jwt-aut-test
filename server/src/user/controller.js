module.exports = {
    signUp: async (req, res, next) => {
        try {
            const user = req.body;
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
            res.status(200).json({
                token: token
            })
        } catch (error) {
            next(error);
        }
    },
    resetPassword: async (req, res, next) => {
        
    }
}