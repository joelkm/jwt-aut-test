const jwt = require('jsonwebtoken');
const model = require('./model');
const bcrypt = require('bcrypt');
const { BadRequestError } = require('../config/app-error');

module.exports = {
    register: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
        user = await model.new(user);
        if(!user) {
            throw new BadRequestError('User not created');
        }
        return user;
    },
    giveAccess: async (user) => {
        const stored = await model.getUserBy("email", user.email);
        if (!await bcrypt.compare(user.password, stored[0].password)) {
            throw new BadRequestError("Incorrect email or password");
        }
        return jwt.sign(user, process.env.JWT_SECRET);
    }
    //sendResetLink
}