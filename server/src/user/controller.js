const bcrypt = require('bcrypt');

module.exports = {
    signUp: async (req, res, next) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const user = { name: req.body.name, password: hashedPassword }
        } catch (error) {
            next(error)
        }
    }
}