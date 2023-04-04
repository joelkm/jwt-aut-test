const { AuthorizationError } = require('../config/app-error')
const jwt = require('jsonwebtoken');

module.exports = {
    authorizeUser: (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) next(new AuthorizationError("No authorization token"));
        jwt.verify(token, process.env.JWT_SECRET, (err) => {
            if(err) next(new AuthorizationError("Invalid authentication token"))
            next();
        })
    }
}