const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const authenticationMiddleware = async (req, res , next) => {
    const authHeader = req.header;
    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthenticatedError('token is not generated')
    }
    const token = authHeader.split(' ')[1];
    // it will seperate the Bearer <token>
    try {
        const decoded = await jwt.verify(token , process.env.SECRET_KEY )
        const {_id , username} = decoded;
        req.user = {_id , username}
        next()
    } catch (error) {
        throw new UnauthenticatedError(error)
    }
}
module.exports = authenticationMiddleware