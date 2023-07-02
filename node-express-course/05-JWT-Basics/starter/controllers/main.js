
const jwt = require('jsonwebtoken')
const { BadRequestError } = require('../errors')

const model = require("../models/model")
const login = async (req , res) => {
    const {username , password} = req.body;

    if(!username || !password) {
        throw new BadRequestError("please provide username and password")
    }
    const token = jwt.sign({_id , username} , process.env.SECRETE_KEY, {
        expiresIn: '30d'
    })
    const newPassword = jwt.bcrypt()
    const data = new model({username: username , password: newPassword });
    await data.save();
    // await model.save({username , newPassword})
    localStorage.setItem({'access-token' : token})
    res.status(300).send({message : "user created" , token})
}
const dashboard = async (req , res) => {
    const luckyNumber = Math.floor(Math.random() * 100);

    res.status(200).send({message : `Here is your lucky number ${luckyNumber}`})
}

module.exports = {login , dashboard}