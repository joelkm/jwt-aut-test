const router = require("express").Router();
const controller = require("./controller");
const validateEmail = require('../middlewares/email-validation');

router.post("/", controller.signUp);

router.post("/login", controller.login);

router.post("/password-reset", controller.resetPassword);

router.post("/logout");

module.exports = router;