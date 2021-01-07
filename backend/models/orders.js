const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({

    articleId:String,
    clientId:String,
    orderState:String,
    orderDate:Date,
})

const orderModel = mongoose.model('orders',orderSchema)

module.exports = orderModel