const jwt = require('jsonwebtoken');
const model = require('./model');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");

const { BadRequestError } = require('../config/app-error');
const { getUserBy } = require('./model');

module.exports = {
    register: async (user) => {
        if (await model.getUserBy("email", user.email)) {
            throw new BadRequestError("Email already registered")
        }
        user.password = await bcrypt.hash(user.password, 10);
        user = await model.new(user);
        if(!user) {
            throw new BadRequestError('User not created');
        }
        return user;
    },
    giveAccess: async (user) => {
        let stored = await model.getUserBy("email", user.email);
        if (!await bcrypt.compare(user.password, stored.password)) {
            throw new BadRequestError("Incorrect email or password");
        }
        await model.updateLoginTimestamp()
        stored = await model.getUserBy("email", user.email);
        const token = jwt.sign({email: stored.email, password: stored.password, loginTimestamp: stored.loginTimestamp},
            process.env.JWT_SECRET, {expiresIn: '1m'});

        const results = { token: token, id: stored._id }
        return results;
    },
    sendResetLink: async (email) => {
        const stored = await model.getUserBy("email", email)
        if(!stored) {
            throw new BadRequestError('Email not registered');
        }        

        const token = jwt.sign({email: email, id: stored._id}, process.env.JWT_SECRET + stored.password, {expiresIn: '15m'});

        const resetLink = `https://allwell-test-app.onrender.com/password-reset/${stored._id}/${token}`

        const transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com", 
            secureConnection: false,
            port: 587, 
            auth: {
              user: process.env.OUTLOOK_USER,
              pass: process.env.OUTLOOK_PASSWORD
            },
            tls: {
                ciphers:'SSLv3'
            }
          });
          
        const mailOptions = {
        from: process.env.OUTLOOK_USER,
        to: email,
        subject: 'Password reset link',
        text: `Hey, it's me Joel
        I see you sent a request to reset your password on my app.
        Don't worry, I got you
        ${resetLink}`
        };
          
        transporter.sendMail(mailOptions)
        console.log('Email sent');
        return resetLink
    },
    changePassword: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
        if(!await model.updatePassword(user.id, user.password)) {
            throw new BadRequestError("Password was not changed")
        }
        return true
    },
    invalidateAccess: async (id) => {
        const stored = await getUserBy("id", id)
        const email = stored.email
        if(!await model.updateLoginTimestamp(email)) {
            throw new BadRequestError("User could not log out");
        }
        return true;
    }
}