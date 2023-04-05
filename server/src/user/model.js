const mongoose = require('mongoose');
const { AppError } = require('../config/app-error')

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    loginTimestamp: Number
});

const users = mongoose.model('user', userSchema)

module.exports = {
    new: async (user) => {
        return await users.create({
            email: user.email,
            password: user.password,
            loginTimestamp: undefined
        });
    },
    getUserBy: async (field, value) => {
        let user
        switch (field) {
            case 'email':
                user = await users.findOne({email: value});
                if(user == null) return false;
                return user;
                break;
            case 'id':
                user = await users.findOne({_id: value});
                if(user == null) return false;
                return user;
                break;
            default:
                throw new AppError();
                break;
        }
    },
    updateLoginTimestamp: async (email) => {
        return await users.findOneAndUpdate({ email: email}, { loginTimestamp: Date.now()});
    },
    updatePassword: async (id, password) => {
        return await users.findOneAndUpdate({_id: id}, {password: password});
    }
}