const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
    title:String,
    description:String,
    brand:String,
    price:String,
    shippingFees:String,
    category:String,
    subcategory:String,
    state:String,
    articleSold:Boolean,
    sellerToken:String,
    images:Array,
    creationDate:Date,
    isVisible:Boolean
})

const articleModel = mongoose.model('articles',articleSchema)

module.exports = articleModel