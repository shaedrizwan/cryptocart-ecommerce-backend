const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type:String,
        required:["Please enter the name"]
    },
    price:{
        type:Number,
        required:["Please enter the price"]
    }
})

module.exports = mongoose.model("Product",productSchema)