const mongoose = require("mongoose")
const Product = require("./product.model")
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema

const cartSchema = new Schema({
    product:{type:Schema.Types.ObjectId, ref:Product},
    quantity: Number
})

const userSchema = new Schema({
    firstname:{
        type:String,
        required:["Enter the first name"]
    },
    lastname:{
        type:String,
        required:['Enter the last name']
    },
    email:{
        type:String,
        required:["Enter the email"]
    },
    username:{
        type:String,
        required:["Enter the username"],
        unique:true
    },
    password:{
        type:String,
        required:["Enter the password"]
    },
    wishlist:[{type:Schema.Types.ObjectId, ref:Product}],
    cart:[cartSchema]
})

userSchema.pre('save',async function(next){
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password,salt)
        this.password = hashedPassword
        next()
    }catch(err){
        next(err)
    }
})


module.exports = mongoose.model("User",userSchema)