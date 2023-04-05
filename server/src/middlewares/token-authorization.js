const { AuthorizationError } = require('../config/app-error')
const jwt = require('jsonwebtoken');
const path = require('path')

module.exports = {
    authorizeUser: (req, res, next) => {
        const token = req.params.token;
        
        jwt.verify(token, process.env.JWT_SECRET, (err) => {
            if(err) {
                next(new AuthorizationError('Invalid auhtentication token, please login'))
            }
            next();
        })
    }
}