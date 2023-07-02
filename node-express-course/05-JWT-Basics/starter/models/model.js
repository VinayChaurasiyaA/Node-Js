const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username : {
        type: String ,
        required
    },
    password : {
        type : String,
        required
    }
})
module.exports = mongoose.model('User' , userSchema);