
const jwt = require('jsonwebtoken')
const { BadRequestError } = require('../errors')

const login = async (req , res) => {
    const {username , password} = req.body;

    if(!username || !password) {
        throw new BadRequestError("please provide username and password")
    }
    const token = jwt.sign({_id , username} , process.env.SECRETE_KEY, {
        expiresIn: '30d'
    })
    localStorage.setItem({'access-token' : token})
    res.status(300).send({message : "user created" , token})
}
const dashboard = async (req , res) => {

}

module.exports = {login , dashboard}