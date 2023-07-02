// const { required } = require("joi")

const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    username : String ,
    password : String,
    email : String,
});

userSchema.pre('save' , async function(){
    const salt = await bcrypt.genSalt(10) // it will make sure that for encoding or cracking the code it takes time
    this.password = bcrypt.hash(this.password, salt);
})
// it will create the jwt token for the login process
userSchema.methods.createJWT = async function () {
    return await jwt.sign({id : this._id , username : username}, process.env.JWT_SECRET, {expiresIn : '30d'})
}

userSchema.methods.comparedWith = async function(canditatePassword){
    const match = await bcrypt.compare(this.password , canditatePassword);

    return match;
}

module.exports = mongoose.model("User" , userSchema);