const userSchema =  require('../models/User')
const errorHandle = require("../errors/bad-request")
const login = async (req , res) => {
    const {username , password , email} = req.body
    if(!username || !password || !email) {
        throw new errorHandle("please provide ")
    }
    const user = userSchema.findOne({email})
    if(!user) {
        throw new errorHandle('Invalid authentications')

    }
    const checkPassword = await userSchema.compare(password)
    if(!checkPassword) {
        throw new errorHandle('unauthorised')
    }
    const createJWTtoken = await userSchema();
    res.status(200).json({userSchema: {name : userSchema.name} , createJWTtoken})
    // set the recieved token in the localstorage

}
const register = async (req , res) => {
    const {username , password , email} = req.body;
    const user = await userSchema.create({username , password , email})
    const createJWTtoken = await userSchema();
    res.status(200).json({userSchema: {name : userSchema.name} , createJWTtoken})
}
module.exports = {login , register}