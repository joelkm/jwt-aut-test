const { AuthorizationError } = require('../config/app-error')
const jwt = require('jsonwebtoken');
const model = require('../user/model');

module.exports = {
    authorizeUser: (req, res, next) => {
        const token = req.params.token;
        
        jwt.verify(token, process.env.JWT_SECRET, (err) => {
            if(err) {
                next(new AuthorizationError('Invalid auhtentication token, please login'))
            }
            next();
        })
    },
    validateLink: async (req, res, next) => {
        const id = req.params.id;
        const token = req.params.token;

        const stored = await model.getUserBy("_id", id);
        const userPassword = stored[0].password;

        jwt.verify(token, process.env.JWT_SECRET + userPassword, (err) => {
            if(err) {
                next(new AuthorizationError('Invalid reset password link'))
            }
            next();
        })
    }
}