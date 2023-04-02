const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const users = mongoose.model('user', userSchema)

module.exports = {
    new: async (user) => {
        return await users.create({
            email: user.email,
            password: user.password
        });
    }
}