const express = require("express")
// const { route } = require("../../final/routes/products")
const router = express.Router()
// const {getAllProducts} = require("./controllers/products");
const {getAllProducts , getAllProductsStatic} = require('../controllers/products')
router.route('/products').get(getAllProducts)
router.route('/').get(getAllProductsStatic)
module.exports = router