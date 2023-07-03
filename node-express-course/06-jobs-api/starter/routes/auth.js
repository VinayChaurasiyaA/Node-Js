const express = require("express")
const authentication = require("../middleware/authentication")

const {login} = require('../controllers/auth')
const router = express.Router

router.route('/login').post(authentication , logins)

module.exports = router