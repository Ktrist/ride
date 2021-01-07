const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email:String,
    password:String,
    address:String,
    city:String,
    postalCode:String,
    // moneyWallet:Number,
    salt:String,
    token:String,
    avatar:String,

})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel