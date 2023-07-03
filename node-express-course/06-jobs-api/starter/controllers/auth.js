const userSchema =  require('../models/User')
const errorHandle = require("../errors/bad-request")
const login = async (req , res) => {
    const {username , password , email} = req.body
    if(!username || !password || !email) {
        throw new errorHandle("please provide ")
    }
    con
}
const register = async (req , res) => {
    
}
module.exports = {login , register}