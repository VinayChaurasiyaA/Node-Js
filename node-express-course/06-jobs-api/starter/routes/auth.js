const express = require("express")
const authentication = require("../middleware/authentication")

const {login, register} = require('../controllers/auth')
const router = express.Router

router.route('/login').post( login)
router.route('/register').post(register);

module.exports = router