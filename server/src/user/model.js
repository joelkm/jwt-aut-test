const mongoose = require('mongoose');

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
        return await users.where(field, "==", value);
    },
    updateLoginTimestamp: async (email) => {
        await users.findOneAndUpdate({ email: email}, { loginTimestamp: Date.now()});
    },
    updatePassword: async (id, password) => {
        return await users.findOneAndUpdate({id: id}, {password: password});
    }
}