const jwt = require('jsonwebtoken')
const {unauthenticated} = require('../errors/unauthenticated')

const auth = async (req , res) => {
    const header = req.header.authorization
    if(!header || !header.startsWith('Bearer ')) {
        throw new unauthenticated('Does not have a token')
    }
    const token = header.split(' ');
    try {
        const payload = jwt.verify(token , process.env.SECRET_KEY);

        res.user = {userId : payload.userId , name : payload.name}
    } catch (error) {
        throw new unauthenticated(error)
    }
}
module.exports = auth