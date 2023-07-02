const express = require("express")
// const { route } = require("../../final/routes/products")
const router = express.Router()
// const {getAllProducts} = require("./controllers/products");
const {getAllProducts} = require('../controllers/products')
router.route('/products').get(getAllProducts)

module.exports = router