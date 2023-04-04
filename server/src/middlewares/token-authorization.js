const { AuthorizationError } = require('../config/app-error')
const jwt = require('jsonwebtoken');
const path = require('path')

module.exports = {
    authorizeUser: (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, (err) => {
            if(err)     res.sendFile(path.join(__dirname, "..", "..", "..", "client", "public", "redirect.html"));
            next();
        })
    }
}