const express = require('express')
const router = express.Router();
const path = require('path')
const { authorizeUser } = require('../middlewares/token-authorization');

const publicPath = path.join(__dirname, "..", "..", "..", "client", "public");

router.use(express.static(publicPath))

router.get("/", authorizeUser ,(req, res) => {
    console.log(('qraro'));
    res.sendFile(path.join(publicPath, "index.html"));
});

router.get("/login", (req, res) => {
    res.sendFile(path.join(publicPath, "log-in.html"));
});

router.get("/sign-up", (req, res) => {
    res.sendFile(path.join(publicPath, "sign-up.html"));
});

//SIGN UP SUCCESS
//router.get("/")

router.get("/reset-password", (req, res) => {
    res.sendFile(path.join(publicPath, "reset-password.html"));
});

router.get("/reset-password/:id/:token", (req, res) => {
    res.sendFile(path.join(publicPath, "change-password.html"));
});

module.exports = router;