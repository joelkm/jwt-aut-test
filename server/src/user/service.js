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
        if (!await bcrypt.compare(user.password, stored[0].password)) {
            throw new BadRequestError("Incorrect email or password");
        }
        await model.updateLoginTimestamp()
        stored = await model.getUserBy("email", user.email);
        user = stored[0];
        return jwt.sign({email: user.email, password: user.password, loginTimestamp: user.loginTimestamp},
            process.env.JWT_SECRET, {expiresIn: '1m'});
    },
    sendResetLink: async (email) => {
        const stored = await model.getUserBy("email", email)
        const user = stored[0];
        if(!user) {
            throw new BadRequestError('Email not registered')
        }

        const token = jwt.sign({email: email, id: user._id}, process.env.JWT_SECRET + user.password, {expiresIn: '15m'});

        const resetLink = `http://localhost:8000/password-reset/${user._id}/${token}`

        const transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com", // hostname
            secureConnection: false, // TLS requires secureConnection to be false
            port: 587, // port for secure SMTP
            auth: {
              user: process.env.OUTLOOK_USER,
              pass: process.env.OUTLOOK_PASSWORD
            },
            tls: {
                ciphers:'SSLv3'
            }
          });
          
        const mailOptions = {
        from: '',
        to: user.email,
        subject: 'Password reset link',
        text: `Hey, it's me Joel
        I see you sent a request to reset your password on my app.
        Don't worry, I got you
        ${resetLink}`
        };
          
        transporter.sendMail(mailOptions)
        console.log('sent');
        return true
    },
    changePassword: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
        if(!await model.updatePassword(id, user.password)) {
            throw new BadRequestError("Password was not changed")
        }
        return true
    },
    invalidateAccess: async (id) => {
        const stored = await getUserBy("id", id)
        const email = stored[0].email
        if(!await model.updateLoginTimestamp(email)) {
            throw new BadRequestError("User could not log out");
        }
        return true;
    }
}