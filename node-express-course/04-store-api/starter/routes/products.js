const express = require("express")
const {product } = require("./models/product")
// const { route } = require("../../final/routes/products")
const router = express.Router()
const {getAllProducts} = require("./controllers/products");

router.route.get('/products' , getAllProducts)

module.exports = router