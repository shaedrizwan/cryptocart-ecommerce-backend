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
    },
    image:{
        type:String,
        required:["Please enter the Image link"]
    },
    slug:{
        type:String,
        required:["Please enter the slug"],
        unique:["slug already exists. It must be unique"]
    },
    description:{
        type:String
    },
    owner:{
        type:String
    }
})

module.exports = mongoose.model("Product",productSchema)