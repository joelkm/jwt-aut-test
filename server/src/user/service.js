const jwt = require('jsonwebtoken');
const model = require('./model');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");

const { BadRequestError } = require('../config/app-error');

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
        const stored = await model.getUserBy("email", user.email);
        if (!await bcrypt.compare(user.password, stored[0].password)) {
            throw new BadRequestError("Incorrect email or password");
        }
        return jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '20m'});
    },
    sendResetLink: async (email) => {
        const stored = await model.getUserBy("email", email)
        const user = stored[0];
        if(!user) {
            throw new BadRequestError('Email not registered')
        }

        const token = jwt.sign({email: email, id: user._id}, process.env.JWT_SECRET + user.password, {expiresIn: '15m'});

        const link = `http://localhost:8000/password-reset/${user._id}/${token}`
        console.log(link);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'joelkasmor16@gmail.com.com',
              pass: 'Kovoya-99'
            }
          });
          
        const mailOptions = {
        from: 'joelkasmor16@gmail.com.com',
        to: user.email,
        subject: 'Subject',
        text: 'Email content'
        };
          
        transporter.sendMail(mailOptions)
        console.log('sent');
        return true
    }
}